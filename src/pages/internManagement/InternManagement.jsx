// InternManagement.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import InternApi from "~/api/internApi";

const InternManagement = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyWord: "",
    universityId: null,
    majorId: null,
    page: 1,
  });
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalElements: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  // Danh sách trường và ngành mẫu
  const universities = [
    { id: 0, name: "Tất cả" },
    { id: 1, name: "Trường ĐẠI HỌC Công nghệ (ĐHQG Hà Nội)" },
    { id: 2, name: "Trường ĐẠI HỌC Y Dược (ĐHQG Hà Nội)" },
  ];

  const majors = [
    { id: 0, name: "Tất cả" },
    { id: 1, name: "IT" },
    { id: 2, name: "Kinh tế" },
  ];

  useEffect(() => {
    fetchInterns();
  }, [filters.page]);

  const fetchInterns = async () => {
    setLoading(true);
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify(filters),
      });

      const data = await response.json();
      setInterns(data.content);
      setPagination({
        pageNumber: data.pageNumber,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        hasNext: data.hasNext,
        hasPrevious: data.hasPrevious,
      });
    } catch (error) {
      console.error("Error fetching interns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, page: 0 });
    fetchInterns();
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 0 });
  };

  const changePage = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="intern-management">
      <div className="page-header">
        <h1 className="page-title">Quản lý thực tập sinh</h1>
        <p className="page-subtitle">Danh sách và thông tin thực tập sinh</p>
      </div>

      {/* Filters */}
      <div className="filter-container">
        <div className="filter-grid">
          <div className="filter-item">
            <label className="filter-label">Từ khóa</label>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
                value={filters.keyWord}
                onChange={(e) => handleFilterChange("keyWord", e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div className="filter-item">
            <label className="filter-label">Trường học</label>
            <select
              className="filter-select"
              value={filters.universityId}
              onChange={(e) =>
                handleFilterChange("universityId", parseInt(e.target.value))
              }
            >
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label className="filter-label">Chuyên ngành</label>
            <select
              className="filter-select"
              value={filters.majorId}
              onChange={(e) =>
                handleFilterChange("majorId", parseInt(e.target.value))
              }
            >
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSearch} className="btn btn-search">
            Tìm kiếm
          </button>

          <button className="btn btn-add">
            <Plus size={20} />
            Thêm tài khoản
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="intern-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>SĐT</th>
                <th>Ngành học</th>
                <th>Trường học</th>
                <th>Trạng thái</th>
                <th>GPA</th>
                <th>Ngày vào thực tập</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : interns.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                interns.map((intern) => (
                  <tr key={intern.id}>
                    <td>TTS {intern.id}</td>
                    <td>{intern.fullName}</td>
                    <td>{intern.phone || "-"}</td>
                    <td>{intern.major}</td>
                    <td>{intern.university}</td>
                    <td>
                      <span
                        className={`status-badge ${intern.status.toLowerCase()}`}
                      >
                        {intern.status}
                      </span>
                    </td>
                    <td>3.20</td>
                    <td>{new Date().toLocaleDateString("vi-VN")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-controls">
            <button
              onClick={() => changePage(filters.page - 1)}
              disabled={!pagination.hasPrevious}
              className="pagination-btn"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="pagination-numbers">
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i)}
                  className={`pagination-number ${
                    filters.page === i ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => changePage(filters.page + 1)}
              disabled={!pagination.hasNext}
              className="pagination-btn"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="pagination-info">
            Tổng số: {pagination.totalElements} thực tập sinh
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternManagement;
