import { useSidebar } from 'vitepress-openapi'
import spec from '../src/openapi.json' with { type: 'json' }
import { defineConfigWithTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

const sidebar = useSidebar({
  spec: spec as any,
  linkPrefix: '/api'
})

export default withMermaid(
  defineConfig({
    title: "Nixopus Docs",
    description: "documentation",
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],
    base: '/',
    themeConfig: {
      search: {
        provider: 'local',
        options: {
          locales: {
            zh: {
              translations: {
                button: {
                  buttonText: '搜索',
                  buttonAriaLabel: '搜索'
                },
                modal: {
                  displayDetails: '显示详细列表',
                  resetButtonTitle: '重置搜索',
                  backButtonTitle: '关闭搜索',
                  noResultsText: '没有结果',
                  footer: {
                    selectText: '选择',
                    selectKeyAriaLabel: '输入',
                    navigateText: '导航',
                    navigateUpKeyAriaLabel: '上箭头',
                    navigateDownKeyAriaLabel: '下箭头',
                    closeText: '关闭',
                    closeKeyAriaLabel: 'esc'
                  }
                }
              }
            }
          }
        }
      },
      editLink: {
        pattern: 'https://github.com/raghavyuva/nixopus/edit/master/docs/:path',
        text: "Edit this page on Github"
      },
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Get Started', link: '/install/index.md' },
        { text: 'Blog', link: '/blog/' }
      ],
      footer: {
        message: `<p align="center"><img src="https://madewithlove.now.sh/in?heart=true&colorA=%23ff671f&colorB=%23046a38&text=Open Source" alt="Made with love with Open Source" /></p>
          Released under the Functional Source License (FSL)
        `,
        copyright: 'Copyright © 2025-present Nixopus'
      },
      sidebar: [
        {
          text: "Get Started",
          items: [
            { text: "Introduction", link: "/introduction/index.md" },
            { text: "Installation", link: "/install/index.md" },
            { text: "Architecture", link: "/architecture/index.md" },
            { text: "Preferences", link: "/preferences/index.md" }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: "Hosting Projects", link: "/self-host/index.md" },
            { text: 'Terminal', link: '/terminal/index.md' },
            { text: "File Manager", link: "/file-manager/index.md" },
            { text: "Notifications", link: "/notifications/index.md" }
          ]
        },
        {
          text: 'Blog',
          items: [
            { text: 'Latest Posts', link: '/blog/' }
          ]
        },
        {
          text: 'Development',
          items: [
            { text: 'Contribution', link: '/contributing/index.md' },
            { text: "Code of Conduct", link: "/code-of-conduct/index.md" },
            { text: "Change Log", link: "https://github.com/raghavyuva/nixopus/releases" },
            { text: "License", link: "/license/index.md" },
            { text: "Privacy Policy", link: "/privacy-policy/index.md" },
            { text: "Credits", link: "/credits/index.md" }
          ]
        },
        {
          text: "Support",
          items: [
            { text: "Sponsor", link: '/sponsor/index.md' },
            { text: "Contact", link: '/contact/index.md' }
          ]
        },
        {
          text: "API Reference",
          items: [
            ...sidebar.generateSidebarGroups().map((group) => ({
              ...group,
              collapsed: true,
              items: group.items.map((item) => {
                const endpoint = item.link.split('/').pop();
                const methodSpan = `
                <span class="OASidebarItem group/oaSidebarItem">
                  <span class="OASidebarItem-badge OAMethodBadge--${extractHttpMethods(item.text)}">${extractHttpMethods(item.text)}</span>
                  <span class="OASidebarItem-text text">${endpoint}</span>
                </span>`;

                return {
                  ...item,
                  link: `${item.link}`,
                  text: methodSpan
                };
              }),
            })),
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/raghavyuva/nixopus' },
        { icon: "discord", link: "https://discord.gg/skdcq39Wpv" },
      ]
    }
  })
)

function extractHttpMethods(text) {
  const methodRegex = /OAMethodBadge--(\w+)/g;
  const methods: string[] = [];
  let match;

  while ((match = methodRegex.exec(text)) !== null) {
    methods.push(match[1].toUpperCase());
  }

  return methods[0]
}
