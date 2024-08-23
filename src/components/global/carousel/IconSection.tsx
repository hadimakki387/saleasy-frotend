import {
    Box,
    Container,
    Divider,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

const IconSection: React.FC = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width:600px)");

    return (
        <Container
            className={`mt-3 ${theme.palette.mode === "dark" ? "bg-black" : "bg-white"}`}
        >
            <Stack
                divider={isLargeScreen ? <Divider orientation="vertical" flexItem /> : null}
                className="flex-wrap"
                direction={"row"}
                alignItems={"center"}
            >
                <MyBox
                    icon={<ElectricBoltIcon fontSize="large" />}
                    title={"Fast Delivery"}
                    subTitle={"Start from $10"}
                />
                <MyBox
                    icon={<WorkspacePremiumOutlinedIcon fontSize="large" />}
                    title={"Money Guarantee"}
                    subTitle={"7 Days Back"}
                />
                <MyBox
                    icon={<AccessAlarmOutlinedIcon fontSize="large" />}
                    title={"365 Days"}
                    subTitle={"For free return"}
                />
                <MyBox
                    icon={<CreditScoreOutlinedIcon fontSize="large" />}
                    title={"Payment"}
                    subTitle={"Secure system"}
                />
            </Stack>
        </Container>
    );
};

export default IconSection;

interface MyBoxProps {
    icon: React.ReactNode;
    title: string;
    subTitle: string;
}

const MyBox: React.FC<MyBoxProps> = ({ icon, title, subTitle }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width:600px)");

    return (
        <Box
            className={`flex flex-grow items-center gap-3 py-4 ${isLargeScreen ? "justify-center" : "justify-start"
                }`}
            style={{ width: 250 }}
        >
            {icon}

            <Box>
                <Typography variant="body1">{title}</Typography>
                <Typography
                    className="font-light"
                    style={{ color: theme.palette.text.secondary }}
                    variant="body1"
                >
                    {subTitle}
                </Typography>
            </Box>
        </Box>
    );
};
