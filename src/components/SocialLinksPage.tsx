import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

import { 
  profileConfig, 
  socialsConfig,
  backgroundConfig,
  uiConfig,
  type ProfileConfig,
  type SocialLinkData,
  type FooterData
} from './socialLinksConfig';

// New component for animated particles in the background
const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    for (let i = 0; i < (backgroundConfig.particleCount || 50); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: backgroundConfig.particleColors[i % backgroundConfig.particleColors.length],
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

const BackgroundEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
    
    {backgroundConfig.gridPattern && (
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
    )}
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-screen bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-blue-500/5 rounded-full blur-[100px] animate-pulse" />
    
    {backgroundConfig.orbs.map((orb, index) => (
      <div 
        key={index}
        className={`absolute ${orb.position} ${orb.size} ${orb.color} rounded-full blur-[120px] animate-[pulse_${orb.animationDuration}_ease-in-out_infinite]`} 
      />
    ))}
    
    <div className="absolute inset-0 bg-[linear-gradient(transparent_3px,rgba(0,0,0,0.1)_3px)] bg-[size:6px_6px] opacity-10" />
    
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-30" />
    
    <ParticleEffect />
  </div>
);

const GlowingLogo: React.FC<{ src: string }> = ({ src }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transform group-hover:scale-110 transition-all duration-700" />
    
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 animate-pulse" />
    
    <div className="relative z-10 border-white/10 transition-all duration-300 group-hover:border-white/30">
      <img src={src} alt="Logo" className="h-8 w-auto" />
    </div>
    
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500" />
  </div>
);

const ProfileHeader: React.FC<{ profile: ProfileConfig }> = ({ profile }) => {
  const DynamicIcon: React.FC<{ name: string } & React.SVGProps<SVGSVGElement>> = ({ name, ...props }) => {
    const IconComponent = Icons[name as keyof typeof Icons] as React.FC<React.SVGProps<SVGSVGElement>>;
    return IconComponent ? <IconComponent {...props} /> : null;
  };

  return (
    <div className="text-center mb-16 relative">
      <div className="inline-block mb-8">
        <GlowingLogo src={profile.logo} />
      </div>

      <div className="relative mb-6 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <h1 className="relative z-10 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          {profile.title}
        </h1>
        
        <div className="h-px w-full mt-2 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>

      <div className="relative max-w-lg mx-auto mb-10 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        <p className="relative z-10 text-gray-300 leading-relaxed">
          {profile.description}
        </p>
      </div>

      {profile.stats && (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-500" />
          
          <div className="relative flex items-center justify-center px-8 py-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
            {profile.stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-6" />}
                
                <div className="flex items-center space-x-3 group/stat">
                  {stat.icon && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover/stat:opacity-50 blur-sm transition-opacity duration-300" />
                      
                      <DynamicIcon
                        name={stat.icon}
                        className={`relative z-10 w-5 h-5 ${stat.color || 'text-blue-400'} transform group-hover/stat:scale-110 transition-transform duration-300`}
                      />
                    </div>
                  )}
                  
                  <span className="text-sm text-gray-300 group-hover/stat:text-white transition-colors duration-300">
                    {stat.value || ''}
                  </span>
                </div>
              </React.Fragment>
            ))}

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLink: React.FC<{ link: SocialLinkData; index: number }> = ({ link, index }) => {
  const DynamicIcon = Icons[link.icon as keyof typeof Icons] as React.FC<React.SVGProps<SVGSVGElement>>;
  const delay = index * 100; 

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative transform hover:-translate-y-1 transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${link.gradient || 'from-blue-600 to-purple-600'} rounded-xl opacity-0 group-hover:opacity-70 blur-lg transition-all duration-700`} />
      
      <div className={`relative overflow-hidden rounded-xl ${uiConfig.cardStyles.backgroundOpacity} ${uiConfig.cardStyles.backdropBlur} border ${uiConfig.cardStyles.borderColor} group-hover:${uiConfig.cardStyles.activeBorderColor} transition-all duration-300`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.05)_25%,rgba(68,68,68,0.05)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.05)_75%)] bg-[length:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
        <div className="relative p-5 flex items-center">
          <div className="relative flex-shrink-0">
            <div className={`absolute -inset-1 bg-gradient-to-r ${link.gradient || 'from-blue-600 to-purple-600'} rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative p-3 rounded-lg bg-black/50 border border-white/10 group-hover:border-white/30 transform group-hover:scale-110 transition-all duration-500">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 animate-pulse" />
              
              {DynamicIcon && <DynamicIcon className="relative z-10 w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />}
            </div>
          </div>

          <div className="ml-5 flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-base font-medium text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {link.name}
                </h3>
                
                {link.tag && (
                  <span className="px-2 py-0.5 text-xs bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-500">
                    {link.tag}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {link.stats && (
                  <span className="text-xs text-gray-500 group-hover:text-blue-300 transition-colors duration-300">
                    {link.stats}
                  </span>
                )}
                
                <div className="relative group/icon">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full opacity-0 group-hover/icon:opacity-100 blur-sm transition-opacity duration-300" />
                  <Icons.ExternalLink className="relative z-10 w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {link.description && (
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {link.description}
              </p>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100" />
      </div>
    </a>
  );
};

const Footer: React.FC<{ footer: FooterData }> = ({ footer }) => (
  <div className="mt-16 text-center relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
    
    <div className="inline-flex items-center space-x-2 text-sm">
      <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {footer.text || ''}
      </span>
      
      <span className="relative">
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
          {footer.highlight || ''}
        </span>
      </span>
    </div>
    
    <div className="h-px w-32 mt-2 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
  </div>
);

const SocialLinksPage: React.FC<{
  profile?: ProfileConfig;
  socials?: SocialLinkData[];
}> = ({
  profile = profileConfig,
  socials = socialsConfig,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, uiConfig.animations.entranceDelay);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && activeIndex < socials.filter(link => link.isActive).length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, uiConfig.animations.staggerDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, activeIndex, socials]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-blue-500/30 selection:text-white">
      <BackgroundEffects />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <ProfileHeader profile={profile} />

          <div className="space-y-5">
            {socials
              .filter((link) => link.isActive)
              .map((link, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 transform ${
                    index <= activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <SocialLink link={link} index={index} />
                </div>
              ))}
          </div>

          {profile.footer && (
            <div
              className={`transition-all duration-1000 delay-500 transform ${
                isVisible && activeIndex >= socials.filter(link => link.isActive).length - 1
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <Footer footer={profile.footer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksPage;