import {
    Box,
    Button,
    Container,
    Typography,
    useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import IconSection from "./IconSection";

const mySlider = [
    { text: "MEN", link: "/banner-15.jpg" },
    { text: "WOMEN", link: "/banner-25.jpg" },
];

const Hero: React.FC = () => {
    const theme = useTheme();
    return (
        <Container> {/* Removed margin and set maxWidth to false */}
            <Box className="pt-2 mt-2.5 flex items-center gap-2">
                <Swiper
                    loop={true}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper cursor-pointer"
                >
                    {mySlider.map((item) => (
                        <SwiperSlide key={item.link} className="relative">
                            <img
                                src={item.link}
                                alt={item.text}
                                className="w-full h-[600px]" // Adjusted the height
                            />
                            <Box
                                className={`${theme.breakpoints.up("sm")
                                    ? "absolute left-10 top-1/4 text-left"
                                    : "pt-4 pb-6"
                                    }`}
                            >
                                <Typography
                                    className="text-[var(--primary)]"
                                    variant="h5"
                                >
                                    LIFESTYLE COLLECTION
                                </Typography>

                                <Typography
                                    className="text-[var(--primary)] font-medium my-1"
                                    variant="h3"
                                >
                                    {item.text}
                                </Typography>

                                <Box className="flex justify-start items-center">
                                    <Typography
                                        className="text-[var(--primary)] mr-1"
                                        variant="h4"
                                    >
                                        SALE UP TO
                                    </Typography>
                                    <Typography
                                        className="text-[var(--button-color)]"
                                        variant="h4"
                                    >
                                        30% OFF
                                    </Typography>
                                </Box>
                                <Typography
                                    className="text-[var(--primary)] font-light my-1"
                                    variant="body1"
                                >
                                    Get Free Shipping on orders over $99.00
                                </Typography>

                                <Button
                                    className="px-5 py-1 mt-2 bg-[var(--primary)] text-white rounded shadow-md "
                                    variant="contained"
                                >
                                    SHOP NOW
                                </Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box className="pt-5"> {/* Added space above IconSection */}
                <IconSection />
            </Box>
        </Container>
    );
};

export default Hero;