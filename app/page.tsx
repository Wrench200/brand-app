"use client";

import { useRouter } from "next/navigation";
import { useBrand } from "./contexts/BrandContext";
import { getCurrentUser } from "./(auth)/hooks/authHooks";
import Link from "next/link";
import React, { useEffect, useState, lazy, Suspense } from "react";
import Image from "next/image"; // Using Next.js Image for better optimization
import {
  ArrowRight,
  Sparkles,
  Palette,
  Share2,
  FolderOpen,
  Check,
  Star,
  CircleCheckBig,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

// Lazy load the lower sections of the page


export default function HomePage() {
  const router = useRouter();
  const { createBrand, isLoading } = useBrand();
  const [error, setError] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Wait for component to mount before starting animations
  useEffect(() => {
    // Set a small delay to ensure critical content loads first
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = async () => {
    // Prevent multiple clicks
    if (isRedirecting) return;
    
    setIsRedirecting(true);
    setError(null);
    
    // Check if user is logged in
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // If user is not logged in, redirect to login immediately
      console.log("Redirecting to login");
      toast.success("Please login to continue");
      router.push("/login");
      return;
    }

    // For logged-in users, redirect immediately
    toast.success("Taking you to the brand builder...");
    router.push("/form");
  };

  // Define the card type
  type BrandCard = {
    color: string;
    image: string;
    alt: string;
    height: string;
  };

  // Reduced number of cards for better performance - just keep the first 8
  const brandCards: BrandCard[] = [
    {
      color: "bg-gradient-to-br from-pink-400 to-pink-500",
      image: "/images/Hanging T Shirt.jpg",
      alt: "Fashion Store",
      height: "h-80",
    },
    {
      color: "bg-gradient-to-br from-blue-400 to-blue-500",
      image: "/images/05.jpg",
      alt: "Tech Company",
      height: "h-48",
    },
    {
      color: "bg-gradient-to-br from-orange-300 to-orange-400",
      image: "/images/10.jpg",
      alt: "Restaurant",
      height: "h-56",
    },
    {
      color: "bg-gradient-to-br from-green-400 to-green-500",
      image: "/images/Luxury Gold Logo Mockup on Black Paper Texture.png",
      alt: "Organic Brand",
      height: "h-72",
    },
    {
      color: "bg-gradient-to-br from-red-400 to-red-500",
      image: "/images/marcel-strauss-kOzjvV0Wy8E-unsplash.jpg",
      alt: "Marketing Agency",
      height: "h-48",
    },
    {
      color: "bg-gradient-to-br from-teal-400 to-teal-500",
      image: "/images/christian-wiediger-8d8KfpYCQV0-unsplash.jpg",
      alt: "Business Consulting",
      height: "h-80",
    },
    {
      color: "bg-gradient-to-br from-purple-400 to-purple-500",
      image: "/images/nik-WUTpM4iPCVA-unsplash.jpg",
      alt: "Creative Studio",
      height: "h-56",
    },
    {
      color: "bg-gradient-to-br from-gray-400 to-gray-500",
      image: "/images/david-hurley-YBUj1dkt4Do-unsplash.jpg",
      alt: "Energy Company",
      height: "h-48",
    }
  ];

  // Distribute cards into 2 columns instead of 3 for better performance
  const distributeCards = (): BrandCard[][] => {
    const columns: BrandCard[][] = [[], []];
    brandCards.forEach((card, index) => {
      columns[index % 2].push(card);
    });
    return columns;
  };

  const features = [
    {
      number: "01",
      title: "Start with Strategy",
      description:
        "Craft your brand's foundation using AI-powered insights. Define your brand's strategy so everything you build feels intentional and customer-focused.",
      items: [
        "Story",
        "Mission & Values",
        "Customer & Competitors Analysis",
        "Differentiation Strategy",
      ],
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
      imageAlt: "Strategic planning and brainstorming session",
      type: "single",
    },
    {
      number: "02",
      title: "Build an awesome logo",
      description:
        "Get a stunning logo and brand identity that reflects your vision. Use Jovo's AI Logo Maker or upload your own to complete your brand visual system.",
      items: [
        "Logo Design",
        "Font & Color Palette",
        "Brand Kits",
        "Brand Guidelines",
      ],
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop&crop=center",
          alt: "Logo design mockups",
        },
        {
          src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop&crop=center",
          alt: "Color palette and typography",
        },
        {
          src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=300&h=200&fit=crop&crop=center",
          alt: "Brand kit materials",
        },
        {
          src: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=300&h=200&fit=crop&crop=center",
          alt: "Brand guidelines document",
        },
      ],
      type: "grid",
    },
    {
      number: "03",
      title: "Design Social Media Content",
      description:
        "Automate your brand's daily content needs. Design, customize, and publish scroll-stopping posts across platforms in just a few clicks.",
      items: ["Posts", "Carousels", "Reels", "Infographics"],
      icon: <Share2 className="w-8 h-8 text-green-600" />,
      image: "/images/SM 5.jpg",
      imageAlt: "Social media content creation and management",
      type: "single",
    },
    {
      number: "04",
      title: "Manage Your Brand Assets",
      description:
        "All logo files and design templates are stored in your brand asset library and easily shared to ensure brand consistency.",
      items: [
        "Logo Files & Templates",
        "Videos, Audio & Brand Images",
        "Brand Guide",
        "Brand and Marketing Strategy",
      ],
      icon: <FolderOpen className="w-8 h-8 text-orange-600" />,
      image: "/images/online-marketing-branding-concept-laptop-screen.jpg",
      imageAlt: "Digital asset management and file organization",
      type: "single",
    },
  ];

  const cardColumns = distributeCards();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Enhanced Background for Navbar Visibility */}
      <div className="relative md:h-screen bg-gradient-to-br from-slate-200 via-blue-50 to-white pb-20">
        {/* Additional subtle pattern overlay for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/20"></div>

        <div className="container mx-auto px-6 pt-32 md:pt-20 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl text-center md:text-left font-extrabold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">
                    AI-powered
                  </span>{" "}
                  brand design at{" "}
                  <span className="bg-gradient-to-r font-semibold from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    lightning speed
                  </span>
                </h1>

                <p className="text-xl md:w-[90%] text-center md:text-left text-gray-600 leading-relaxed">
                  From logos, brand kit to social media content. We give you
                  everything you need to launch today.
                </p>
              </div>

              {/* Get Started Button with improved loading state */}
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleGetStarted}
                  disabled={isLoading || isRedirecting}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed relative"
                >
                  {isRedirecting ? (
                    <>
                      <span className="mr-2">Please wait</span>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </div>

            {/* Right Content - Only show animation when page is loaded */}
            <div className={`relative h-[70vh] md:h-[90vh] max-h-screen transform md:rotate-3 [mask-image:linear-gradient(to_bottom,transparent_5%,black_20%,black_80%,transparent_95%)] ${isPageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              {/* Reduced columns from 3 to 2 for better performance */}
              <div className="grid grid-cols-2 gap-4 h-full overflow-hidden relative">
                {cardColumns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={`flex flex-col gap-4 ${
                      isPageLoaded ? 
                        (columnIndex === 0 
                          ? "animate-scroll-up-infinite" 
                          : "animate-scroll-down-infinite") 
                        : ""
                    }`}
                  >
                    {/* Only duplicate once instead of twice for better performance */}
                    {[...column, ...column].map(
                      (card, cardIndex) => (
                        <div
                          key={`${columnIndex}-${cardIndex}`}
                          className={`${card.height} rounded overflow-hidden transform hover:scale-105 hover:-rotate-3 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer flex-shrink-0 relative group`}
                        >
                          {/* Use Next.js Image component for better optimization */}
                          <div className="w-full h-full relative">
                            <Image
                              src={card.image}
                              alt={card.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              loading={cardIndex < 4 ? "eager" : "lazy"}
                              priority={cardIndex < 2}
                            />
                          </div>
                          
                          {/* Enhanced gradient overlay for hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                         
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lazy load the rest of the page */}
      <Suspense fallback={<div className="h-20 bg-white"></div>}>
        {/* What You Get Section */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What you get
              </h2>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Automated Branding & Marketing in One Place
              </h3>
              <p className="text-gray-600">
                Build and launch your brand in a few clicks
              </p>
            </div>

            {/* Features Grid */}
            <div className="space-y-32 md:space-y-40">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`space-y-6 ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-gray-300">
                        {feature.number}
                      </span>
                      {feature.icon}
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {feature.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CircleCheckBig className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Visual */}
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    {feature.type === "grid" ? (
                      // Grid layout for Feature 02 (Logo Design)
                      <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                          {feature.images?.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
                            >
                              {/* Use Next.js Image for grid images */}
                              <div className="relative w-full h-40">
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Feature number overlay for grid */}
                        <div className="absolute -top-3 -left-3 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center z-10">
                          <span className="text-lg font-bold text-purple-600">
                            {feature.number}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Single image layout for other features
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        {/* Use Next.js Image for single feature image */}
                        <div className="relative w-full h-80 lg:h-96">
                          <Image
                            src={feature.image ?? "/images/placeholder.png"}
                            alt={feature.imageAlt ?? "Feature image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Gradient overlay for better visual appeal */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Feature number overlay */}
                        <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-800">
                            {feature.number}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Automate Your Branding with AI
              </h2>

              <button
                onClick={handleGetStarted}
                disabled={isLoading || isRedirecting}
                className="px-12 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                {isRedirecting ? (
                  <>
                    <span className="mr-2">Please wait</span>
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="flex justify-center items-center gap-6 pt-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-300 fill-current"
                    />
                  ))}
                </div>
                <span className="text-white/90">Trusted by 10,000+ brands</span>
              </div>
            </div>
          </div>
        </div>
      </Suspense>

      {/* Optimized animation styles */}
      <style jsx>{`
        @keyframes scroll-up-infinite {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%); /* Reduced from -33.333% for better performance */
          }
        }

        @keyframes scroll-down-infinite {
          0% {
            transform: translateY(-50%); /* Reduced from -33.333% for better performance */
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-up-infinite {
          animation: scroll-up-infinite 40s linear infinite; /* Slowed down from 30s to 40s */
          will-change: transform; /* Hint to browser to optimize */
        }

        .animate-scroll-down-infinite {
          animation: scroll-down-infinite 40s linear infinite; /* Slowed down from 30s to 40s */
          will-change: transform; /* Hint to browser to optimize */
        }

        .animate-scroll-up-infinite:hover,
        .animate-scroll-down-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}