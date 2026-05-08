
import {
    useEffect,
    useState
} from "react";

import {
    Container,
    Typography,
    Select,
    MenuItem,
    Box,
    TextField
} from "@mui/material";

import NotificationCard
from "../components/NotificationCard";

import {
    fetchNotifications
} from "../utils/api";

function calculatePriority(
    type,
    timestamp
) {

    const weights = {
        Placement: 3,
        Result: 2,
        Event: 1
    };

    const ageInHours =
        (
            Date.now() -
            new Date(
                timestamp.replace(" ", "T")
            ).getTime()
        ) /
        (1000 * 60 * 60);

    return (
        (weights[type] || 0) * 100
    ) - ageInHours;
}


function PriorityNotifications() {

    const [notifications,
        setNotifications] = useState([]);

    const [topN,
        setTopN] = useState(10);

    const [filter,
        setFilter] = useState("");


    useEffect(() => {

        loadNotifications();

    }, [filter, topN]);


    async function loadNotifications() {

        const data =
            await fetchNotifications(
                10,
                1,
                filter
            );


        const ranked =
            data.map((item) => {

                return {
                    ...item,

                    priority:
                        calculatePriority(
                            item.Type,
                            item.Timestamp
                        )
                };
            });


        ranked.sort(
            (a, b) =>
                b.priority - a.priority
        );


        setNotifications(
            ranked.slice(0, topN)
        );
    }


    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Priority Inbox
            </Typography>


            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3
                }}
            >

                <TextField
                    type="number"
                    label="Top N"
                    value={topN}
                    onChange={(e) =>
                        setTopN(
                            Number(e.target.value)
                        )
                    }
                    fullWidth
                />


                <Select
                    value={filter}
                    onChange={(e) =>
                        setFilter(
                            e.target.value
                        )
                    }
                    displayEmpty
                    fullWidth
                >

                    <MenuItem value="">
                        All Types
                    </MenuItem>

                    <MenuItem value="Placement">
                        Placement
                    </MenuItem>

                    <MenuItem value="Result">
                        Result
                    </MenuItem>

                    <MenuItem value="Event">
                        Event
                    </MenuItem>

                </Select>

            </Box>


            {
                notifications.map((item) => (

                    <NotificationCard
                        key={item.ID}
                        notification={item}
                    />

                ))
            }

        </Container>
    );
}

export default PriorityNotifications;