import { Pagination, Stack } from "@mui/material"

const Mpaginate = ({ page, totalPage, setPage }) => {
    return (
        <Stack spacing={2} alignItems={"center"}>
            <Pagination
                count={totalPage}
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
                color={'primary'}
            />
        </Stack>
    )
}
export default Mpaginate