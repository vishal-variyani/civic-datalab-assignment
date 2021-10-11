import { Button, Card, CardContent, Grid, Link, Typography } from '@mui/material';

interface Props {
  post: any,
  openDialog: (resource: any) => void
}

export const DataCard = (props: Props) => {
  return (
    <Grid item xs={10} sm={10} md={6} className="data-card">
      <Card sx={{ width: 450 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <Link href="#" color="inherit">
              {props.post.title}
            </Link>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.post.notes}
          </Typography>
          {
            props.post.resources.map((resource: any, index: number) => {
              if (resource.format === 'CSV') {
                return (
                  <Button variant="contained" className="csv-button" key={index} onClick={() => props.openDialog(resource)}>
                    {resource.format}
                  </Button>
                )
              }
              return null;
            })
          }
        </CardContent>
      </Card>
    </Grid>
  )
}
