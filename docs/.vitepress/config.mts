import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'vi-VN',
  title: 'DeepM Docs',
  description: 'Trung tâm tài liệu & hướng dẫn sử dụng hệ sinh thái DeepM Tools',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['meta', { name: 'theme-color', content: '#f59e0b' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'DeepM Docs',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Tìm kiếm tài liệu...',
                buttonAriaLabel: 'Tìm kiếm'
              },
              modal: {
                noResultsText: 'Không tìm thấy kết quả cho',
                resetButtonTitle: 'Xóa tìm kiếm',
                footer: {
                  selectText: 'để chọn',
                  navigateText: 'để điều hướng',
                  closeText: 'để đóng'
                }
              }
            }
          }
        }
      }
    },

    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: '🚗 Khách hàng', link: '/customer/' },
      { text: '🔧 Thợ máy & Kỹ thuật', link: '/technician/' },
      { text: '📊 Marketing & Quản trị', link: '/marketing/' },
      {
        text: 'Hệ sinh thái DeepM',
        items: [
          { text: 'DeepM Toolbox Engineering', link: 'https://toolbox-engineering.vercel.app/' },
          { text: 'Marketing Tracker', link: 'https://marketing-tracker-navy.vercel.app/' },
          { text: 'Website DeepM.vn', link: 'https://deepm.vn' },
        ]
      }
    ],

    sidebar: {
      '/customer/': [
        {
          text: '🚗 Dành cho Khách hàng & Chủ xe',
          items: [
            { text: 'Tổng quan & Giới thiệu', link: '/customer/' },
            { text: '1. Đọc & Giải mã thông số lốp', link: '/customer/reading-tire-specs' },
            { text: '2. So sánh & Mô phỏng lên mâm', link: '/customer/tire-comparison-visualizer' },
            { text: '3. Cảnh báo sai số đồng hồ tốc độ', link: '/customer/speedometer-error' },
          ]
        }
      ],
      '/technician/': [
        {
          text: '🔧 Dành cho Thợ máy & Kỹ thuật',
          items: [
            { text: 'Tổng quan kỹ thuật', link: '/technician/' },
            { text: '1. Bộ công cụ tính toán (Mechanic Tools)', link: '/technician/mechanic-tools' },
            { text: '2. Bách khoa toàn thư thuật ngữ lốp', link: '/technician/tire-encyclopedia' },
            { text: '3. Quản lý lịch sử & Xuất file Excel', link: '/technician/export-excel' },
          ]
        }
      ],
      '/marketing/': [
        {
          text: '📊 Dành cho Marketing & Quản trị',
          items: [
            { text: 'Tổng quan Marketing Portal', link: '/marketing/' },
            { text: '1. Nhập & Nộp link bài truyền thông', link: '/marketing/submit-post' },
            { text: '2. Theo dõi bài viết của tôi (/my-posts)', link: '/marketing/tracking-posts' },
            { text: '3. Quản trị viên & Phân quyền (/admin/staff)', link: '/marketing/admin-guide' },
          ]
        }
      ]
    },

    docFooter: {
      prev: 'Trang trước',
      next: 'Trang kế tiếp'
    },

    darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Chuyển sang chế độ sáng',
    darkModeSwitchTitle: 'Chuyển sang chế độ tối',
    sidebarMenuLabel: 'Danh mục',
    returnToTopLabel: 'Lên đầu trang',

    footer: {
      message: 'Tài liệu hướng dẫn chính thức - Hệ sinh thái công nghệ DeepM.',
      copyright: 'Copyright © 2026 DeepM Lab. All rights reserved.'
    }
  }
});
