import { ArrowForward } from "@mui/icons-material";

const DealsOfTheDay = () => {
    return (
        <div className="pt-8 pb-8 flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Deals Of The Day</h3>
            <a
                href="/"
                className="relative inline-flex items-center gap-2 pb-1 text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
            >
                <span className="relative group">
                    More Products
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
                </span>
                <ArrowForward className="text-base" />
            </a>
        </div>
    );
};

export default DealsOfTheDay;
