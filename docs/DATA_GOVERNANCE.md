# Data Governance

## Principles

- Không bịa thông số.
- Mọi bản ghi xe phải có `sourceUrl`, `sourceName`, `sourceLastCheckedAt`, `confidenceScore` và `notes`.
- Mọi trường thiếu phải hiển thị “Đang cập nhật từ nguồn chính thức”.
- Dữ liệu ưu tiên nguồn chính thức của VinFast Việt Nam.

## Conflict Handling

- Nếu hai nguồn mâu thuẫn, ưu tiên nguồn chính thức.
- Nếu hai nguồn chính thức vẫn mâu thuẫn, giữ giá trị ở trạng thái `pending` hoặc `conflicting`.
- Cảnh báo phải xuất hiện trong `docs/data-validation-report.md`.

## Confidence Score

- `1.0`: nguồn chính thức trực tiếp.
- `0.8`: tài liệu chính thức nhưng không cùng trang model.
- `0.6`: báo chí uy tín, chỉ dùng tham khảo.
- Dưới `0.6`: không dùng cho thông số chính.

## Validation Workflow

Run:

```bash
npm run validate:data
```

The script validates Zod schema, source metadata, important missing fields and writes `docs/data-validation-report.md`.
