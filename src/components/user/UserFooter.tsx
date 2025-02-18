const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & About */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">CleanPro</h2>
            <p className="mt-2 text-gray-400">
              Your trusted laundry partner for fresh, clean, and hassle-free services.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <p className="text-gray-400">📍 123 Laundry Street, City</p>
            <p className="text-gray-400">📞 +1 234 567 890</p>
            <p className="text-gray-400">📧 support@cleanpro.com</p>
          </div>
        </div>
  
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CleanPro Laundry. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  