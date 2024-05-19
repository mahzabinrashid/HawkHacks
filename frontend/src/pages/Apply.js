import Box from "../components/apply/Box";
import "./Apply.scss";
import Grid from "@mui/material/Grid";

export default function Apply() {
  return (
    <div className="apply">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box />
        </Grid>
        <Grid item xs={6}>
          <Box />
        </Grid>
        <Grid item xs={6}>
          <Box />
        </Grid>
        <Grid item xs={6}>
          <Box />
        </Grid>
      </Grid>
    </div>
  );
}
