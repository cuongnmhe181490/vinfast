export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  relatedCars: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "so-sanh-vf-3-va-vf-5",
    title: "So sánh VF 3 và VF 5: xe nhỏ đô thị hay SUV hạng A?",
    description: "Gợi ý cách đọc khác biệt về kích thước, số chỗ, pin và nhu cầu sử dụng giữa VF 3 và VF 5.",
    relatedCars: ["vf-3", "vf-5"],
    body: [
      "VF 3 phù hợp người cần xe nhỏ, dễ xoay trở trong phố và ưu tiên chi phí sở hữu.",
      "VF 5 rộng hơn, có 5 chỗ và phù hợp gia đình nhỏ cần khoang hành lý linh hoạt.",
      "Người dùng nên kiểm tra giá, chính sách pin và ưu đãi tại nguồn chính thức trước khi quyết định.",
    ],
  },
  {
    slug: "nen-chon-vf-6-hay-vf-7",
    title: "Nên chọn VF 6 hay VF 7?",
    description: "Khung so sánh nhanh giữa SUV hạng B và hạng C cho gia đình, công nghệ và vận hành.",
    relatedCars: ["vf-6", "vf-7"],
    body: [
      "VF 6 tập trung vào cân bằng đô thị, kích thước gọn và nhu cầu gia đình trẻ.",
      "VF 7 có không gian lớn hơn và các phiên bản hiệu năng cao hơn trong seed dữ liệu.",
      "Khi so sánh, hãy xem cả kích thước, ADAS, dung lượng pin, quãng đường và nguồn dữ liệu cập nhật.",
    ],
  },
  {
    slug: "xe-dien-vinfast-phu-hop-gia-dinh-nao",
    title: "Xe điện VinFast phù hợp gia đình nào?",
    description: "Gợi ý phân nhóm nhu cầu gia đình theo số chỗ, hành trình, không gian và công nghệ.",
    relatedCars: ["vf-5", "vf-6", "vf-8", "vf-9"],
    body: [
      "Gia đình đô thị có thể bắt đầu từ VF 5 hoặc VF 6 nếu ưu tiên kích thước gọn.",
      "Gia đình thường đi xa hoặc cần khoang rộng nên xem thêm VF 8 và VF 9.",
      "Thông số trong website demo chỉ là lớp tham khảo có nguồn, không thay thế tư vấn bán hàng chính thức.",
    ],
  },
  {
    slug: "adas-tren-xe-dien-vinfast-la-gi",
    title: "ADAS trên xe điện VinFast là gì?",
    description: "Giải thích các nhóm hỗ trợ lái, camera, cảm biến và cách đọc trang thông số an toàn.",
    relatedCars: ["vf-6", "vf-7", "vf-8", "vf-9"],
    body: [
      "ADAS là nhóm tính năng hỗ trợ người lái, ví dụ cảnh báo điểm mù, giữ làn hoặc ga tự động thích ứng.",
      "Tính năng có thể khác nhau theo phiên bản, thị trường và thời điểm cập nhật phần mềm.",
      "Người dùng nên xem nguồn chính thức theo đúng phiên bản xe trước khi đánh giá mức an toàn.",
    ],
  },
  {
    slug: "cach-doc-thong-so-quang-duong-di-chuyen-xe-dien",
    title: "Cách đọc thông số quãng đường di chuyển xe điện",
    description: "Phân biệt chuẩn NEDC, WLTP và tác động của điều kiện vận hành tới quãng đường thực tế.",
    relatedCars: ["vf-3", "vf-6", "vf-8", "vf-9"],
    body: [
      "Quãng đường theo chuẩn thử nghiệm là điểm tham chiếu, không phải cam kết giống nhau trong mọi điều kiện sử dụng.",
      "Tải trọng, thời tiết, tốc độ, điều hòa và địa hình đều ảnh hưởng tới quãng đường thực tế.",
      "Website demo ghi rõ chuẩn thử nghiệm nếu nguồn có công bố, và để trống nếu chưa xác thực được.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
