// socialLinksConfig.ts

export interface Stat {
  icon: string;
  color?: string;
  value?: string | number;
}

export interface FooterData {
  text?: string;
  highlight?: string;
  encodedMessage: string;
}

export interface ProfileConfig {
  logo: string;
  title: string;
  description: string;
  stats: Stat[];
  footer: FooterData;
}

export interface SocialLinkData {
  name: string;
  icon: string;
  href: string;
  gradient: string;
  description?: string;
  stats?: string;
  tag?: string;
  isActive: boolean;
}

// Background configuration
export const backgroundConfig = {
  particleColors: ["#4D7BF3", "#A84CF3"],
  particleCount: 50,
  gridPattern: true,
  orbs: [
    { position: "top-20 left-10", size: "w-96 h-96", color: "bg-blue-500/20", animationDuration: "8s" },
    { position: "bottom-20 right-10", size: "w-96 h-96", color: "bg-purple-500/20", animationDuration: "10s" },
    { position: "top-1/4 right-1/4", size: "w-64 h-64", color: "bg-cyan-500/10", animationDuration: "12s" },
  ],
};

// Profile configuration
export const profileConfig: ProfileConfig = {
  logo: "https://raw.githubusercontent.com/inulute/inulute-assets/53d0462ca09311bf6e67ceff84589d15cabb7279/inulute-grad-blu.svg", //Add your logo URL here or want to use file then add it to the public folder and use it like "/logo.svg"
  title: "Let's Connect & Build Together", //Add your title here
  description: "Building open-source tools and sharing insights about software development and modern web technologies.", //Add your description here
  stats: [
    {
      icon: "Heart",
      value: "800+ Stars", //Add your value here
      color: "text-red-400"
    },
    {
      icon: "Globe",
      value: "50+ Countries", //Add your value here
      color: "text-blue-400"
    }
  ],
  footer: {
    text: "Made with love by",
    highlight: "inulute",
    encodedMessage: "inulute"
  }
};

// Social links configuration

{/* 
  name: Name of the social media platform
  icon: Heroicons icon name
  href: URL of your profile
  gradient: Gradient classes for the card
  description: Description of the platform
  stats: Additional stats like followers, etc.
  tag: Tag for the platform
  isActive: Boolean to show/hide the platform
*/}

export const socialsConfig: SocialLinkData[] = [
  {
    name: 'GitHub',
    icon: 'Github',
    href: 'https://github.com/inulute',
    gradient: 'from-gray-600 to-gray-400',
    description: 'Open Source Projects & Tools',
    tag: 'Code',
    isActive: true
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    href: 'https://twitter.com/inulute',
    gradient: 'from-blue-600 to-cyan-600',
    description: 'Tech Updates & Development Journey',
    tag: 'Updates',
    isActive: true
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    href: 'https://linkedin.com/company/inulute',
    gradient: 'from-blue-700 to-blue-500',
    description: 'Professional Network & Career Updates',
    tag: 'Professional',
    isActive: true
  },
  {
    name: 'YouTube',
    icon: 'Youtube',
    href: 'https://youtube.com/@inulute',
    gradient: 'from-red-600 to-red-400',
    description: 'Video Content & Tutorials',
    tag: 'Content',
    isActive: false
  },
  {
    name: 'Instagram',
    icon: 'Instagram',
    href: 'https://instagram.com/inulute',
    gradient: 'from-pink-600 to-purple-600',
    description: 'Behind the Scenes & Life Updates',
    tag: 'Social',
    isActive: true
  },
  {
    name: 'Telegram',
    icon: 'Send',
    href: 'https://t.me/inulute',
    gradient: 'from-cyan-600 to-blue-600',
    description: 'Join Our Community',
    tag: 'Connect',
    isActive: true
  },
  {
    name: 'Discord',
    icon: 'MessageSquare',
    href: 'https://discord.gg/',
    gradient: 'from-indigo-600 to-indigo-400',
    description: 'Join Our Discord Server',
    stats: '5K+ Members',
    tag: 'Community',
    isActive: false
  },
  {
    name: 'Medium',
    icon: 'Book',
    href: 'https://medium.com/@',
    gradient: 'from-gray-800 to-gray-600',
    description: 'Tech Articles & Blog Posts',
    stats: '1K+ Followers',
    tag: 'Blog',
    isActive: false
  },
  {
    name: 'Dev.to',
    icon: 'Code2',
    href: 'https://dev.to/',
    gradient: 'from-black to-gray-800',
    description: 'Developer Blog & Articles',
    stats: '500+ Followers',
    tag: 'Blog',
    isActive: false
  },
  {
    name: 'Hashnode',
    icon: 'Hash',
    href: 'https://hashnode.com/@',
    gradient: 'from-blue-600 to-blue-400',
    description: 'Technical Blog Posts',
    stats: '300+ Followers',
    tag: 'Blog',
    isActive: false
  },
  {
    name: 'CodePen',
    icon: 'Codepen',
    href: 'https://codepen.io/',
    gradient: 'from-gray-900 to-gray-700',
    description: 'Code Snippets & Demos',
    stats: '200+ Pens',
    tag: 'Code',
    isActive: false
  },
  {
    name: 'ProductHunt',
    icon: 'Robot',
    href: 'https://www.producthunt.com/@',
    gradient: 'from-orange-600 to-orange-400',
    description: 'Product Launches & Updates',
    stats: '100+ Followers',
    tag: 'Products',
    isActive: false
  },
  {
    name: 'Twitch',
    icon: 'Twitch',
    href: 'https://twitch.tv/',
    gradient: 'from-purple-700 to-purple-500',
    description: 'Live Coding Streams',
    stats: '100+ Followers',
    tag: 'Streaming',
    isActive: false
  },
  {
    name: 'Ko-fi',
    icon: 'Coffee',
    href: 'https://ko-fi.com/',
    gradient: 'from-blue-500 to-blue-300',
    description: 'Support My Work',
    stats: '50+ Supporters',
    tag: 'Support',
    isActive: false
  },
  {
    name: 'Patreon',
    icon: 'Heart',
    href: 'https://www.patreon.com/',
    gradient: 'from-orange-700 to-orange-500',
    description: 'Exclusive Content & Support',
    stats: '25+ Patrons',
    tag: 'Support',
    isActive: false
  },
  {
    name: 'Email',
    icon: 'Mail',
    href: 'mailto:connect@inulute.com',
    gradient: 'from-green-600 to-green-400',
    description: 'Contact Me Directly',
    stats: '24h Response',
    tag: 'Contact',
    isActive: true
  },
  {
    name: 'Portfolio',
    icon: 'Briefcase',
    href: 'https://inulute.com',
    gradient: 'from-violet-600 to-violet-400',
    description: 'My Projects & Work',
    stats: '10+ Projects',
    tag: 'Portfolio',
    isActive: false
  },
  {
    name: 'Reddit',
    icon: 'Radio',
    href: 'https://reddit.com/user/',
    gradient: 'from-orange-600 to-red-600',
    description: 'Discussions & Community',
    stats: '500+ Karma',
    tag: 'Social',
    isActive: false
  },
  {
    name: 'Stack Overflow',
    icon: 'Library',
    href: 'https://stackoverflow.com/users/',
    gradient: 'from-orange-500 to-orange-300',
    description: 'Q&A & Knowledge Sharing',
    stats: '1K+ Rep',
    tag: 'Community',
    isActive: false
  },
  {
    name: 'Mastodon',
    icon: 'Share2',
    href: 'https://mastodon.social/@',
    gradient: 'from-blue-600 to-purple-600',
    description: 'Decentralized Social Updates',
    stats: '200+ Followers',
    tag: 'Social',
    isActive: false
  },
  {
    name: 'Website',
    icon: 'Globe',
    href: 'https://inulute.com',
    gradient: 'from-violet-600 to-violet-400',
    description: 'My Projects & Work',
    tag: 'Website',
    isActive: true
  },
];

// UI element configurations
export const uiConfig = {
  
  // Animation settings
  animations: {
    staggerDelay: 150,
    entranceDelay: 300,
  },
  
  // Card styling
  cardStyles: {
    borderColor: "border-white/10",
    activeBorderColor: "border-white/30",
    backgroundOpacity: "bg-black/40",
    backdropBlur: "backdrop-blur-xl",
  }
};