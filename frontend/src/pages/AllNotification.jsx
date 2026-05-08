
import {
    useEffect,
    useState
} from "react";

import {
    Container,
    Typography,
    Select,
    MenuItem,
    Box
} from "@mui/material";

import NotificationCard
from "../components/NotificationCard";

import {
    fetchNotifications
} from "../utils/api";

function AllNotifications() {

    const [notifications,
        setNotifications] = useState([]);

    const [viewed,
        setViewed] = useState({});

    const [filter,
        setFilter] = useState("");


    useEffect(() => {

        loadNotifications();

    }, [filter]);


    async function loadNotifications() {

        const data =
            await fetchNotifications(
                10,
                1,
                filter
            );

        setNotifications(data);
    }


    function markViewed(id) {

        setViewed({
            ...viewed,
            [id]: true
        });
    }


    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                All Notifications
            </Typography>


            <Box sx={{ mb: 3 }}>

                <Select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
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
                        viewed={viewed[item.ID]}
                        onClick={() =>
                            markViewed(item.ID)
                        }
                    />

                ))
            }

        </Container>
    );
}

export default AllNotifications;