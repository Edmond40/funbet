import { useState } from "react";
import { ArrowLeft, Gift, HelpCircle, FileText, Shield, Bell, Globe, Download, Share2, Star, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const More = () => {
  const navigate = useNavigate();

  const menuSections = [
    {
      title: "Promotions & Rewards",
      items: [
        {
          icon,
          label: "Bonuses & Promotions",
          description: "View active bonuses and special offers",
          badge: "3 Active",
          action: () => console.log("Bonuses")
        },
        {
          icon,
          label: "Loyalty Program",
          description: "Earn points and unlock exclusive rewards",
          badge: "VIP",
          action: () => console.log("Loyalty")
        }
      ]
    },
    {
      title: "App & Settings",
      items: [
        {
          icon,
          label: "Download App",
          description: "Get the SportyBet mobile app",
          badge: "New",
          action: () => console.log("Download")
        },
        {
          icon,
          label: "Notifications",
          description: "Manage your notification preferences",
          action: () => console.log("Notifications")
        },
        {
          icon,
          label: "Language & Region",
          description: "Change language and location settings",
          action: () => console.log("Language")
        }
      ]
    },
    {
      title: "Support & Information",
      items: [
        {
          icon,
          label: "Help Center",
          description: "Find answers to common questions",
          action: () => console.log("Help")
        },
        {
          icon,
          label: "Live Chat",
          description: "Chat with our support team",
          badge: "24/7",
          action: () => console.log("Live Chat")
        },
        {
          icon,
          label: "Contact Us",
          description: "Get in touch with customer support",
          action: () => console.log("Contact")
        },
        {
          icon,
          label: "Terms & Conditions",
          description: "Read our terms of service",
          action: () => console.log("Terms")
        },
        {
          icon,
          label: "Privacy Policy",
          description: "Learn about our privacy practices",
          action: () => console.log("Privacy")
        }
      ]
    },
    {
      title: "Social & Sharing",
      items: [
        {
          icon: Share2,
          label: "Refer Friends",
          description: "Invite friends and earn rewards",
          badge: "₵500 Bonus",
          action: () => console.log("Refer")
        },
        {
          icon,
          label: "Rate App",
          description: "Rate SportyBet on app stores",
          action: () => console.log("Rate")
        }
      ]
    }
  ];

  const quickStats = {
    totalUsers: "2.5M+",
    dailyMatches: "1,500+",
    supportLanguages: 8,
    countries: 15
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "https://facebook.com/sportybet" },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com/sportybet" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com/sportybet" },
    { name: "YouTube", icon: "📺", url: "https://youtube.com/sportybet" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-sporty-red text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">More</h1>
        </div>
      </header>

      <div className="p-4">
        {/* App Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-sporty-red rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">SB</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">SportyBet</h2>
            <p className="text-gray-600">Version 3.2.1</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-sporty-red">{quickStats.totalUsers}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-sporty-red">{quickStats.dailyMatches}</div>
              <div className="text-sm text-gray-600">Daily Matches</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-sporty-red">{quickStats.supportLanguages}</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-sporty-red">{quickStats.countries}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg shadow-sm mb-4">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge className="bg-sporty-red text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="grid grid-cols-4 gap-3">
            {socialLinks.map((social, index) => (
              <button
                key={index}
                onClick={() => console.log(`Open ${social.name}`)}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl mb-1">{social.icon}</span>
                <span className="text-xs text-gray-600">{social.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
          <p className="text-sm text-red-700 mb-3">
            If you're experiencing issues with gambling, we're here to help.
          </p>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="w-4 h-4 mr-1" />
              Call Support
            </Button>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
              <Mail className="w-4 h-4 mr-1" />
              Email Us
            </Button>
          </div>
        </div>

        {/* App Version & Legal */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>SportyBet Mobile App v3.2.1</p>
          <p>© 2024 SportyBet. All rights reserved.</p>
          <p>Licensed and regulated by the appropriate authorities</p>
          <div className="flex justify-center space-x-4 mt-3">
            <button className="hover:text-sporty-red">Privacy Policy</button>
            <button className="hover:text-sporty-red">Terms of Service</button>
            <button className="hover:text-sporty-red">Responsible Gaming</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
