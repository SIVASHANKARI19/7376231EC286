import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box
} from "@mui/material";

function NotificationCard({
    notification,
    viewed,
    onClick
}) {

    return (

        <Card
            onClick={onClick}
            sx={{
                mb: 2,
                cursor: "pointer",
                opacity: viewed ? 0.5 : 1,
                borderRadius: 3,
                boxShadow: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {notification.Message}
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center"
                    }}
                >

                    <Chip
                        label={notification.Type}
                        color={
                            notification.Type ===
                            "Placement"
                                ? "success"
                                : notification.Type ===
                                  "Result"
                                ? "primary"
                                : "warning"
                        }
                    />

                    <Typography variant="body2">

                        {notification.Timestamp}

                    </Typography>

                </Box>

            </CardContent>

        </Card>
    );
}

export default NotificationCard;