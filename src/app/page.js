"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Import next/image
import { ChevronRight, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, Code, BookOpen, Briefcase, Award, Menu, X, Download, Sun, Moon } from "lucide-react";

// Resume Data (remains the same)
const resumeData = {
  name: "Biprangshu Das",
  tagline: "Android Developer & Frontend Enthusiast",
  email: "dasbiprangshu@gmail.com",
  phone: "6000838977",
  location: "Guwahati, India",
  github: "https://github.com/jarvis1704", 
  linkedin: "https://www.linkedin.com/in/biprangshu-das-34017427a", 
  resumeUrl: "/BiprangshuDas_Resume.pdf", 
  imageUrl: "/IMG-20250101-WA0021~2.jpg",
  about: [
    "I'm a passionate Android Developer and aspiring Frontend Engineer with experience in building responsive and interactive applications using modern technologies. Currently focused on native Android development with Kotlin and Jetpack Compose, I also excel in web technologies like React.js and Tailwind CSS.",
    "As a student at Tezpur University pursuing a B.Tech in Electronics and Communications Engineering, I'm actively involved in tech communities, including the Google Developer Student Club. I love solving problems through clean, efficient code and creating seamless user experiences.",
    "My interests extend to competitive activities like Chess, Debate, and Quizzes, alongside a fascination for Cinematic Storytelling and a growing understanding of Financial Literacy."
  ],
  experiences: [
    {
      title: "Development Team Member",
      company: "GDSC Tezpur University",
      period: "Aug 2023 – Present",
      location: "Tezpur, Assam",
      description: [
        "Actively contribute to a Google Developer Student Club focused on building a vibrant tech community and fostering innovative projects.",
        "Participate in app development initiatives as a core team member, applying modern development practices."
      ]
    },
    {
      title: "WebMaster Team Member",
      company: "TechXetra, Tezpur University",
      period: "Oct 2017 – Jul 2023",
      location: "Tezpur, Assam",
      description: [
        "Contributed to Tezpur University's annual technical fest, TechXetra, by developing and maintaining its official website.",
        "Utilized skills in Tailwind CSS, React.js, TypeScript, and GitHub to create a responsive and informative platform for the event."
      ]
    }
  ],
  projects: [
    {
      title: "Blood Donation App",
      subtitle: "Client project for Red Cross Society",
      description: "Developed a native Android application for the Red Cross Society to streamline the blood donation process. Features include global announcements, real-time blood requests, and user management.",
      technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Dagger Hilt", "Timber", "Firebase"],
      links: [ { label: "GitHub", icon: <Github size={16} />, url: "https://github.com/jarvis1704/blood-donation-app" }],
      color: "from-red-500 to-pink-600"
    },
    {
      title: "NewsApp",
      subtitle: "A dynamic news reader application",
      description: "Created a news reader app that fetches and displays articles from an API. Implemented functionalities like news categorization, search, and bookmarking articles for future reading.",
      technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Dagger Hilt", "ROOM Database"],
      links: [ { label: "GitHub", icon: <Github size={16} />, url: "https://github.com/jarvis1704/News-App" }],
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "PokeDex App",
      subtitle: "Explore the world of Pokemon",
      description: "Designed a fun and interactive PokeDex application to display information about Pokemons. Focused on a smooth user interface, Material Dynamic Theming, and engaging animations.",
      technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Dagger Hilt", "Timber"],
      links: [ { label: "GitHub", icon: <Github size={16} />, url: "https://github.com/jarvis1704/Android-PokeDex" }],
      color: "from-yellow-400 to-orange-500"
    }
  ],
  skills: {
    languages: ["Kotlin", "Java", "Python", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    frameworksLibraries: ["Jetpack Compose", "Retrofit", "Dagger Hilt", "Room Database", "React.js", "Tailwind CSS"],
    toolsTechnologies: ["Android Studio", "Visual Studio Code", "Git", "GitHub", "Linux", "Firebase"]
  },
  education: [
    { institution: "Tezpur University", degree: "Bachelor of Technology in Electronics and Communications Engineering", period: "2023-Present", location: "Tezpur, Assam", grade: "CGPA: 7.56" },
    { institution: "Spring Dale International School", degree: "Major: Class 11 and 12", period: "Jul. 2021 - Mar. 2023", location: "Guwahati, Assam", grade: "CGPA: 8.6/10" },
    { institution: "Maharishi Vidya Mandir", degree: "Major: Class 2 - 10", period: "Apr. 2012 - Mar. 2021", location: "Guwahati, Assam", grade: "CGPA: 9.0/10" }
  ],
  interests: ["Chess", "Debate", "Quiz", "Cinematic Storytelling", "Financial Literacy"]
};


// Main App Component
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [userThemePreference, setUserThemePreference] = useState('system');
  const [effectiveTheme, setEffectiveTheme] = useState('light');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const storedUserPref = localStorage.getItem('theme_preference') || 'system';
      setUserThemePreference(storedUserPref);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      let currentEffectiveTheme = 'light';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (userThemePreference === 'dark') {
        currentEffectiveTheme = 'dark';
      } else if (userThemePreference === 'light') {
        currentEffectiveTheme = 'light';
      } else {
        currentEffectiveTheme = systemPrefersDark ? 'dark' : 'light';
      }
      setEffectiveTheme(currentEffectiveTheme);
    }
  }, [userThemePreference, hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      const root = window.document.documentElement;
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [effectiveTheme, hasMounted]);

  useEffect(() => {
    if (!hasMounted || userThemePreference !== 'system') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setEffectiveTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [hasMounted, userThemePreference]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          current = section.id;
        }
      });
      setActiveSection(current);
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - (isScrolled || isMenuOpen ? 60 : 70),
        behavior: 'smooth'
      });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleThemeToggle = () => {
    if (!hasMounted) return;
    let newPreference;
    if (userThemePreference === 'light') {
      newPreference = 'dark';
    } else if (userThemePreference === 'dark') {
      newPreference = 'system';
    } else {
      newPreference = 'light';
    }
    setUserThemePreference(newPreference);
    localStorage.setItem('theme_preference', newPreference);
  };

  return (
    <div className="font-sans bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 min-h-screen selection:bg-indigo-500 selection:text-white dark:selection:bg-indigo-400 dark:selection:text-slate-900">
      <Header
        activeSection={activeSection}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
        name={resumeData.name}
        onThemeToggle={handleThemeToggle}
        hasMounted={hasMounted}
        userThemePreference={userThemePreference}
      />

      <main className={`${isMenuOpen ? 'blur-sm' : ''} transition-all duration-300`}>
        <HeroSection data={resumeData} scrollToSection={scrollToSection} />
        <AboutSection data={resumeData.about} />
        <ExperienceSection data={resumeData.experiences} />
        <ProjectsSection data={resumeData.projects} />
        <SkillsSection data={resumeData.skills} />
        <EducationSection data={resumeData.education} />
        <ContactSection data={resumeData} />
      </main>

      <Footer data={resumeData} />
    </div>
  );
}

// SectionTitle Component
function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16 opacity-0 animate-fadeInUp">
      {children}
      <span className="block w-20 h-1 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-3 rounded"></span>
    </h2>
  );
}

// Header Component
function Header({ activeSection, isScrolled, isMenuOpen, toggleMenu, scrollToSection, name, onThemeToggle, hasMounted, userThemePreference }) {
  const navItems = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }, { id: 'skills', label: 'Skills' }, { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];
  const initials = name.split(' ').map(n => n[0]).join('');

  const getThemeIconAndLabel = () => {
    let icon = <div className="w-5 h-5" />;
    let ariaLabel = "Toggle theme";

    if (hasMounted) {
      if (userThemePreference === 'light') {
        icon = <Moon size={22} />;
        ariaLabel = "Switch to dark mode";
      } else if (userThemePreference === 'dark') {
        icon = <Sun size={22} />;
        ariaLabel = "Switch to system preference";
      } else {
        const systemIsDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        icon = systemIsDark ? <Sun size={22}/> : <Moon size={22}/>;
        ariaLabel = "Switch to light mode";
      }
    }
    return { icon, ariaLabel };
  };

  const { icon: themeToggleIcon, ariaLabel: themeToggleAriaLabel } = getThemeIconAndLabel();

  const headerBaseClass = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
  const scrolledOrMenuOpenClass = isScrolled || isMenuOpen
      ? `bg-white dark:bg-slate-800/90 ${isMenuOpen && hasMounted ? "dark:backdrop-blur-sm" : ""} shadow-lg py-3`
      : "bg-transparent py-5";
  const mobileNavClass = isMenuOpen && hasMounted ? "backdrop-blur-sm" : "";


  return (
    <header className={`${headerBaseClass} ${scrolledOrMenuOpenClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer" onClick={() => scrollToSection('home')}>
          {initials}
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)}
              className={`text-sm font-semibold transition-all duration-300 relative group ${ activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
              {item.label}
              <span className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : ''}`}></span>
            </button>
          ))}
          <button onClick={onThemeToggle} disabled={!hasMounted}
            className="ml-4 p-2 rounded-full text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={themeToggleAriaLabel}>
            {themeToggleIcon}
          </button>
        </nav>

        <div className="md:hidden flex items-center">
            <button onClick={onThemeToggle} disabled={!hasMounted}
                className="mr-2 p-2 rounded-full text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={themeToggleAriaLabel}>
             {themeToggleIcon}
            </button>
            <button className="text-gray-700 dark:text-slate-300 focus:outline-none z-[60]" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} className="text-indigo-600 dark:text-indigo-400"/> : <Menu size={28} />}
            </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-white/90 dark:bg-slate-900/90 transition-opacity duration-300 ease-in-out ${mobileNavClass} ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-[55]`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white dark:bg-slate-800 shadow-xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-[60] pt-20`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)}
              className={`text-lg font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400'}`}>
              {item.label}
            </button>
          ))}
           <a href={resumeData.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center text-sm">
              My Resume <Download size={18} className="ml-2" />
            </a>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection({ data, scrollToSection }) {
  // Determine if imageUrl is an external URL or a local public path
  const isExternalImage = data.imageUrl && (data.imageUrl.startsWith('http://') || data.imageUrl.startsWith('https://'));

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 md:pt-24 md:pb-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <p className="text-lg md:text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-2 md:mb-3 opacity-0 animate-fadeInUp">Hello, I'm</p> 
            <h1 className="group text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-5 text-gray-900 dark:text-white opacity-0 animate-fadeInUp animation-delay-100">
              {data.name.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-200 ease-out md:group-hover:text-indigo-500 md:dark:group-hover:text-indigo-300 md:group-hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-slate-300 mb-8 md:mb-10 opacity-0 animate-fadeInUp animation-delay-200">
              {data.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 animate-fadeInUp animation-delay-300">
              <button onClick={() => scrollToSection('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center">
                Contact Me <ChevronRight size={20} className="ml-2" />
              </button>
              <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold py-3 px-8 rounded-lg border-2 border-indigo-600 dark:border-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center">
                My Resume <Download size={18} className="ml-2" />
              </a>
            </div>
            <div className="flex space-x-5 mt-10 md:mt-12 justify-center md:justify-start opacity-0 animate-fadeInUp animation-delay-400">
              <SocialButton icon={<Github />} href={data.github} label="GitHub" />
              <SocialButton icon={<Linkedin />} href={data.linkedin} label="LinkedIn" />
              <SocialButton icon={<Mail />} href={`mailto:${data.email}`} label="Email" />
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center opacity-0 animate-fadeIn animation-delay-500">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700 opacity-20 dark:opacity-30 animate-pulse"></div>
              <div className="absolute inset-2 sm:inset-3 rounded-full bg-white dark:bg-slate-700 shadow-xl overflow-hidden">
                 {data.imageUrl ? (
                    isExternalImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={data.imageUrl} alt={data.name} className="w-full h-full object-cover"/>
                    ) : (
                      <Image
                          src={data.imageUrl}
                          alt={data.name}
                          width={384} // Provide appropriate width, e.g., max size of lg:w-96
                          height={384} // Provide appropriate height
                          className="w-full h-full object-cover"
                          priority // Good for LCP element
                      />
                    )
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-7xl sm:text-8xl md:text-9xl">
                        {data.name.split(' ').map(n => n[0]).join('')}
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Button Component
function SocialButton({ icon, href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-slate-700 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-gray-700 dark:text-slate-300 hover:text-white dark:hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
      {icon}
    </a>
  );
}

// About Section
function AboutSection({ data }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>About Me</SectionTitle>
        <div className="max-w-3xl mx-auto opacity-0 animate-fadeInUp">
          {data.map((paragraph, index) => (
             <p key={index} className="text-lg text-gray-700 dark:text-slate-300 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: paragraph
                        .replace(/Android Developer/g, '<span class="text-indigo-600 dark:text-indigo-400 font-semibold">Android Developer</span>')
                        .replace(/Frontend Engineer/g, '<span class="text-indigo-600 dark:text-indigo-400 font-semibold">Frontend Engineer</span>')
                        .replace(/Kotlin and Jetpack Compose/g, '<span class="text-indigo-600 dark:text-indigo-400 font-semibold">Kotlin and Jetpack Compose</span>')
                        .replace(/React\.js and Tailwind CSS/g, '<span class="text-indigo-600 dark:text-indigo-400 font-semibold">React.js and Tailwind CSS</span>')
                }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section & Card
function ExperienceSection({ data }) {
  return (
    <section id="experience" className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Work Experience</SectionTitle>
        <div className="max-w-3xl mx-auto space-y-12">
          {data.map((exp, index) => ( <ExperienceCard key={index} experience={exp} index={index} /> ))}
        </div>
      </div>
    </section>
  );
}
function ExperienceCard({ experience, index }) {
  return (
    <div className={`bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-slate-700/50 dark:hover:shadow-indigo-500/20 transition-all duration-300 opacity-0 animate-fadeInUp animation-delay-${index*150} group hover:scale-[1.02]`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{experience.title}</h3>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-1 sm:mt-0">{experience.period}</p>
      </div>
      <p className="text-lg text-indigo-500 dark:text-indigo-400/80 mb-1">{experience.company}</p>
      <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center mb-4"> <MapPin size={14} className="mr-1.5 flex-shrink-0" /> {experience.location} </p>
      <ul className="text-gray-700 dark:text-slate-300 space-y-2 text-base">
        {experience.description.map((item, idx) => ( <li key={idx} className="flex items-start"> <ChevronRight size={18} className="mr-2 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" /> <span>{item}</span> </li> ))}
      </ul>
    </div>
  );
}

// Projects Section & Card
function ProjectsSection({ data }) {
  return (
    <section id="projects" className="py-16 md:py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {data.map((project, index) => ( <ProjectCard key={index} project={project} index={index} /> ))}
        </div>
      </div>
    </section>
  );
}
function ProjectCard({ project, index }) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-slate-700/50 dark:hover:shadow-indigo-500/30 transition-all duration-300 bg-white dark:bg-slate-800 flex flex-col h-full opacity-0 animate-fadeInUp animation-delay-${index*150} group hover:scale-[1.03]`}>
      <div className={`h-4 bg-gradient-to-r ${project.color}`}></div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
        <p className="text-sm text-indigo-600 dark:text-indigo-400/90 mb-3">{project.subtitle}</p>
        <p className="text-gray-700 dark:text-slate-300 text-base mb-4 leading-relaxed flex-grow">{project.description}</p>
        <div className="mb-6 mt-auto">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2">Technologies Used:</p>
          <div className="flex flex-wrap gap-2"> {project.technologies.map((tech, idx) => ( <span key={idx} className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium"> {tech} </span> ))} </div>
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-slate-700 flex gap-4">
        {project.links.map((link, idx) => ( <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline transition-colors"> {link.icon} <span>{link.label}</span> </a> ))}
      </div>
    </div>
  );
}

// Skills Section & Card
function SkillsSection({ data }) {
  const skillCategories = [
    { title: "Languages", icon: <Code size={24} className="text-indigo-600 dark:text-indigo-400" />, skills: data.languages },
    { title: "Frameworks & Libraries", icon: <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />, skills: data.frameworksLibraries },
    { title: "Tools & Technologies", icon: <Briefcase size={24} className="text-indigo-600 dark:text-indigo-400" />, skills: data.toolsTechnologies }
  ];
  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Skills & Expertise</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {skillCategories.map((category, index) => ( <SkillCard key={index} category={category} index={index} /> ))}
        </div>
      </div>
    </section>
  );
}
function SkillCard({ category, index }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-700/50 dark:hover:shadow-indigo-500/20 transition-all duration-300 opacity-0 animate-fadeInUp animation-delay-${index*150} group hover:scale-[1.02]`}>
      <div className="flex items-center mb-5">
        <div className="mr-4 p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg"> {category.icon} </div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, idx) => ( <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-gray-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-lg transition-colors duration-200 text-sm font-medium"> {skill} </span> ))}
      </div>
    </div>
  );
}

// Education Section
function EducationSection({ data }) {
  return (
    <section id="education" className="py-16 md:py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Education</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-indigo-200 dark:bg-slate-700 rounded-full"></div>
            <div className="md:hidden absolute left-[calc(1rem+0.125rem-0.5px)] top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-slate-700 rounded-full"></div>
            {data.map((edu, index) => (
              <EducationCard key={index} education={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Education Card Component
function EducationCard({ education, index }) {
  const isLeftOnDesktop = index % 2 === 0;
  return (
    <div className={`relative mb-10 md:mb-12 opacity-0 animate-fadeInUp animation-delay-${index*150} group`}>
      <div className="absolute left-[0.875rem] md:left-1/2 transform -translate-x-1/2 md:top-1.5 w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-800 flex items-center justify-center z-10 shadow-md group-hover:scale-110 transition-transform">
        <Award size={16} className="text-white"/>
      </div>
      <div className={`ml-[calc(0.875rem+0.875rem+1rem)] md:ml-0 md:w-[calc(50%-1.75rem)] ${isLeftOnDesktop ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <div className={`bg-white dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl dark:shadow-slate-700/40 dark:hover:shadow-indigo-500/20 transition-all duration-300 group-hover:scale-[1.02] w-full ${isLeftOnDesktop ? 'md:text-right' : 'md:text-left'}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{education.institution}</h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-1 text-base">{education.degree}</p>
          {education.grade && ( <p className="text-gray-600 dark:text-slate-300 text-sm font-semibold mb-2"> {education.grade} </p> )}
          <div className={`text-gray-500 dark:text-slate-400 text-xs mt-2 flex flex-col sm:items-center w-full ${isLeftOnDesktop ? 'sm:flex-row-reverse' : 'sm:flex-row sm:justify-between'}`}>
             <span className={`flex items-center mb-1 sm:mb-0 ${isLeftOnDesktop ? 'sm:ml-2 justify-end' : 'sm:mr-2 justify-start'}`}>
                {isLeftOnDesktop && education.location } <MapPin size={12} className={`${isLeftOnDesktop ? 'ml-1':'mr-1'}`}/> {!isLeftOnDesktop && education.location}
              </span>
              <span>{education.period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// Contact Section, Item & Form
function ContactSection({ data }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); setError(''); setIsSubmitted(false);
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError('Please fill in all fields.'); setIsSubmitting(false); return;
    }
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true); setFormData({ name: '', email: '', subject: '', message: ''});
        setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) { setError(err.message || 'An error occurred. Please try again.');
    } finally { setIsSubmitting(false); }
  };
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 opacity-0 animate-fadeInUp">
          <div className="lg:w-2/5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Let&apos;s Connect</h3> 
            <p className="text-gray-700 dark:text-slate-300 mb-8 text-lg leading-relaxed"> I&apos;m always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to reach out! </p> 
            <div className="space-y-6">
              <ContactItem icon={<Mail size={20}/>} title="Email" content={data.email} href={`mailto:${data.email}`} />
              <ContactItem icon={<Phone size={20}/>} title="Phone" content={data.phone} href={`tel:${data.phone}`} />
              <ContactItem icon={<MapPin size={20}/>} title="Location" content={data.location} />
              <div className="flex gap-4 mt-10"> <SocialButton icon={<Github />} href={data.github} label="GitHub" /> <SocialButton icon={<Linkedin />} href={data.linkedin} label="LinkedIn" /> </div>
            </div>
          </div>
          <div className="lg:w-3/5">
            <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl dark:shadow-slate-700/50">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
              {isSubmitted && ( <div className="bg-green-100 dark:bg-green-500/20 border-l-4 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 p-4 rounded-md mb-6 flex items-center shadow" role="alert"> <svg className="w-6 h-6 mr-3 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg> <p>Your message has been sent successfully! I&apos;ll get back to you soon.</p> </div> )} 
              {error && ( <div className="bg-red-100 dark:bg-red-500/20 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-md mb-6 shadow" role="alert"> <p>{error}</p> </div> )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div> <label htmlFor="name" className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Name</label> <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition-all duration-200 outline-none shadow-sm" required /> </div>
                  <div> <label htmlFor="email" className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Email</label> <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition-all duration-200 outline-none shadow-sm" required /> </div>
                </div>
                <div className="mb-6"> <label htmlFor="subject" className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Subject</label> <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition-all duration-200 outline-none shadow-sm" required /> </div>
                <div className="mb-8"> <label htmlFor="message" className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Message</label> <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition-all duration-200 outline-none shadow-sm resize-none" required ></textarea> </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white dark:text-slate-900 font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50 disabled:opacity-70" disabled={isSubmitting}> {isSubmitting ? ( <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Sending...</> ) : ( 'Send Message' )} </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ data }) {
  return (
    <footer className="bg-gray-800 dark:bg-slate-950 text-gray-300 dark:text-slate-400 py-10 border-t border-gray-700 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
            <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors"><Github size={24}/></a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors"><Linkedin size={24}/></a>
            <a href={`mailto:${data.email}`} aria-label="Email" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors"><Mail size={24}/></a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        <p className="text-xs mt-2">Built with Next.js, React & Tailwind CSS. Inspired by modern design.</p>
      </div>
    </footer>
  );
}