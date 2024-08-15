import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="bg-[rgb(34,41,53)] text-white p-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0 lg:space-x-16">
                <div className="flex flex-col space-y-4 lg:w-1/3">
                    <div className="flex items-center space-x-4">
                        <a href="/">
                            <img className="h-12" src="https://bazaar.ui-lib.com/assets/images/logo.svg" alt="Logo" />
                        </a>
                        <p className="text-gray-400 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex space-x-4">
                            {/* Google Play Button */}
                            <a href="/" className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded w-40">
                                <svg
                                    className="w-4 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                </svg>
                                <div>
                                    <div className="text-xs">Get it on</div>
                                    <div className="font-bold">Google Play</div>
                                </div>
                            </a>

                            {/* Apple App Store Button */}
                            <a href="/" className="flex items-center space-x-2 bg-black text-white py-2 px-4 rounded w-40">
                                <svg
                                    className="w-4 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="#74C0FC"
                                        d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"
                                    />
                                </svg>
                                <div>
                                    <div className="text-xs">Get it on</div>
                                    <div className="font-bold">App Store</div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-16 lg:w-2/3 space-y-8 lg:space-y-0">
                    <div className="flex flex-col space-y-2">
                        <h6 className="font-bold text-white">About Us</h6>
                        <a className="text-gray-400 hover:text-white" href="/">Careers</a>
                        <a className="text-gray-400 hover:text-white" href="/">Our Stores</a>
                        <a className="text-gray-400 hover:text-white" href="/">Our Cares</a>
                        <a className="text-gray-400 hover:text-white" href="/">Terms & Conditions</a>
                        <a className="text-gray-400 hover:text-white" href="/">Privacy Policy</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h6 className="font-bold text-white">Customer Care</h6>
                        <a className="text-gray-400 hover:text-white" href="/">Help Center</a>
                        <a className="text-gray-400 hover:text-white" href="/">Track Your Order</a>
                        <a className="text-gray-400 hover:text-white" href="/">Corporate & Bulk Purchasing</a>
                        <a className="text-gray-400 hover:text-white" href="/">Returns & Refunds</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h6 className="font-bold text-white">Contact Us</h6>
                        <p className="text-gray-400">Lamma tshufa ya Kassem tzakkar nhaart lli 3mlt l whatsapp najoo7 (Address)</p>
                        <p className="text-gray-400">Email: Neje7@gmail.com</p>
                        <p className="text-gray-400">Phone: +961 78 919 829</p>
                        <div className="flex space-x-2 mt-4">
                            <a href="https://www.facebook.com/UILibOfficial">
                                <button className="bg-blue-600 text-white p-2 rounded">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 8 14" aria-hidden="true">
                                        <path d="M6.9 5.8h-1V3.9c0-.3.2-.7.7-.7h.3v-2h-1.4C4.2 1.2 4 2.1 4 2.8v2.9H2.7V8h1.3v5h2.4V8h1.7L8 5.8H6.9z" />
                                    </svg>
                                </button>
                            </a>
                            <a href="https://twitter.com/uilibofficial">
                                <button className="bg-blue-400 text-white p-2 rounded">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M23.4 4.8c-.8.4-1.6.7-2.5.8.9-.6 1.5-1.4 1.8-2.5-.8.5-1.7.9-2.7 1.1-.8-.8-1.8-1.2-2.9-1.2-2.2 0-4 1.8-4 4 0 .3 0 .7.1 1C7.7 8.4 4.1 6.6 1.6 3.7.6 5 .2 6.7.7 8.3c-.8 0-1.6-.3-2.3-.7v.1c0 2 1.4 3.6 3.3 4-.7.2-1.5.3-2.2.1.6 2 2.3 3.5 4.4 3.6-1.6 1.2-3.5 1.9-5.6 1.9-.4 0-.8 0-1.1-.1C2 19.7 4.4 21 7 21c8.4 0 13-7 13-13v-.6c.9-.6 1.6-1.4 2.1-2.3z" />
                                    </svg>
                                </button>
                            </a>
                            <a href="https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg">
                                <button className="bg-red-600 text-white p-2 rounded">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 15 11" aria-hidden="true">
                                        <path d="M14.8 1.8C14.6 1 14 0.5 13.2 0.3 11.6 0 7.5 0 7.5 0s-4.1 0-5.7.3c-.8.2-1.4.7-1.6 1.5-.3 1.6-.3 5-.3 5s0 3.4.3 5c.2.8.7 1.3 1.6 1.5C3.4 11 7.5 11 7.5 11s4.1 0 5.7-.3c.8-.2 1.4-.7 1.6-1.5.3-1.6.3-5 .3-5s0-3.4-.3-5zM6.2 7.7V3.3l3.9 2.2-3.9 2.2z" />
                                    </svg>
                                </button>
                            </a>
                            <a href="https://www.google.com/search?q=ui-lib.com">
                                <button className="bg-gray-800 text-white p-2 rounded">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 14 14" aria-hidden="true">
                                        <path d="M13.9 6H7v2.6h4.1c-.2.8-.8 1.5-1.5 1.8V13h2.5c1.4-1.3 2.2-3.2 2.2-5.4C14.3 7 14.2 6.5 13.9 6z" />
                                        <path d="M7 14c1.8 0 3.4-.6 4.6-1.6l-2.5-2.5c-.6.4-1.3.6-2.1.6-1.6 0-2.9-1-3.4-2.4H.9v1.5C2 12.3 4.3 14 7 14z" />
                                        <path d="M3.6 8.5c-.2-.6-.2-1.3 0-1.9V5H.9c-.6 1.2-.6 2.6 0 3.8L3.6 8.5z" />
                                        <path d="M7 5.5c.9 0 1.7.3 2.3.9l1.7-1.7C10.4 3.7 8.9 3 7 3 4.3 3 2 4.7.9 6.5L3.6 8C4.1 6.5 5.4 5.5 7 5.5z" />
                                    </svg>
                                </button>
                            </a>
                            <a href="https://www.instagram.com/uilibofficial/">
                                <button className="bg-pink-500 text-white p-2 rounded">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 14 14" aria-hidden="true">
                                        <path d="M7 0c1.9 0 2.1 0 2.8.1.8.1 1.4.2 2 .5.6.3 1.2.7 1.6 1.2.4.4.9 1 1.2 1.6.2.6.4 1.3.5 2 .1.7.1 1 .1 2.8s0 2.1-.1 2.8c-.1.8-.3 1.4-.5 2-.3.6-.7 1.2-1.2 1.6-.4.4-1 .9-1.6 1.2-.6.2-1.3.4-2 .5-.7.1-1 .1-2.8.1s-2.1 0-2.8-.1c-.8-.1-1.4-.3-2-.5-.6-.3-1.2-.7-1.6-1.2-.4-.4-.9-1-1.2-1.6-.2-.6-.4-1.3-.5-2C0 9.1 0 8.8 0 7s0-2.1.1-2.8c.1-.8.3-1.4.5-2 .3-.6.7-1.2 1.2-1.6.4-.4 1-.9 1.6-1.2.6-.2 1.3-.4 2-.5C4.9 0 5.1 0 7 0zm0 1.3C5.2 1.3 5 1.3 4.2 1.4c-.7.1-1.1.2-1.4.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.2.7-.3 1.4-.1.8-.1 1-.1 2.8s0 2.1.1 2.8c.1.7.2 1.1.3 1.4.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.7.2 1.4.3.8.1 1 .1 2.8.1s2.1 0 2.8-.1c.7-.1 1.1-.2 1.4-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.2-.7.3-1.4.1-.8.1-1 .1-2.8s0-2.1-.1-2.8c-.1-.7-.2-1.1-.3-1.4-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.7-.2-1.4-.3-.8-.1-1-.1-2.8-.1zm0 2.5c1.2 0 2.3.5 3.1 1.3.8.8 1.3 1.9 1.3 3.1s-.5 2.3-1.3 3.1c-.8.8-1.9 1.3-3.1 1.3s-2.3-.5-3.1-1.3c-.8-.8-1.3-1.9-1.3-3.1s.5-2.3 1.3-3.1c.8-.8 1.9-1.3 3.1-1.3zm0 1.3c-.9 0-1.7.4-2.3.9-.6.6-.9 1.4-.9 2.3s.4 1.7.9 2.3c.6.6 1.4.9 2.3.9s1.7-.4 2.3-.9c.6-.6.9-1.4.9-2.3s-.4-1.7-.9-2.3c-.6-.6-1.4-.9-2.3-.9zm4-1.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9.4-.9.9-.9.9.4.9.9z" />
                                    </svg>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
