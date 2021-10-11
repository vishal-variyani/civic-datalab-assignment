import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'

interface Props {

}
export const Header = (props: Props) => {
  return (
      <div>
      <AppBar className="header">
        <Toolbar>
          <a href="\">
            <Avatar src="/logo192.png"/>
          </a>
          <Typography variant="h5" className="title">Assignment</Typography>
        </Toolbar>
      </AppBar> 
      </div>
  )
}
