const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & About */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">NutroPro</h2>
            <p className="mt-2 text-gray-400">
              Your trusted laundry partner for fresh, clean, and hassle-free services.
            </p>
          </div>
  

<div className="  lg:flex justify-around gap-10 px-5 sm:px-10">
  {/* Quick Links */}
  <div className="flex ">
       <div className="sm:ml-10 md:ml-20 flex-1">
    <h3 className="text-lg font-semibold mb-3 justify-start">Quick links</h3>
    <ul className="text-gray-400 space-y-2">
      <li><a href="/" className="hover:text-white">Home</a></li>
      <li><a href="/services" className="hover:text-white">Services</a></li>
      <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
      <li><a href="/contact" className="hover:text-white">Contact</a></li>
    </ul>
  </div>

  {/* Contact Info */}
  <div className="flex-1 ml-12">
    <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
    <p className="text-gray-400">📍 123 Laundry Street, City</p>
    <p className="text-gray-400">📞 +1 234 567 890</p>
    <p className="text-gray-400">📧 support@cleanpro.com</p>
  </div>
  </div>


  {/* Follow Us */}

  <div className="items-center mt-3">
     <div className="flex-1">
    <h3 className="text-lg items-center font-semibold mb-3 text-center  lg:text-left">Follow Us</h3>
    <div className="flex justify-center  space-x-4 text-gray-400">
      <a href="https://facebook.com" className="hover:text-white">🌐 Facebook</a>
      <a href="https://twitter.com" className="hover:text-white">🐦 Twitter</a>
      <a href="https://instagram.com" className="hover:text-white">📸 Instagram</a>
    </div>
  </div>
  </div>
  
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
  