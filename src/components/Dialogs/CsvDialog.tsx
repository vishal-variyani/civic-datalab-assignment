import { CircularProgress, Dialog, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import * as Papaparse from 'papaparse';

import React from 'react'

interface Props {
  showDialog: boolean,
  onClose: () => void,
  resource: any
}
export default class CsvDialog extends React.Component<Props> {
  state = {
    csvData: [],
    loading: true,
  }
  componentDidMount() {
    Papaparse.parse(this.props.resource.url, {
      download: true,
      header: false,
      complete: (results) =>
      {
        this.setState({csvData: results.data, loading: false});
      }
    })
  }
  getDialogContent = () => {
    if (this.state.loading) {
      return (
        <div className="dialog-loader">
           <CircularProgress />
        </div>
      )
    } else {
      return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              { this.getTableHeadCells() }
            </TableRow>
          </TableHead>
          <TableBody>
            { this.getTableBodyRows() }
          </TableBody>
        </Table>
      </TableContainer>
      )
    }
  }
  getTableHeadCells = () => {
    if (this.state.csvData.length) {
      let head: any = this.state.csvData[0];
    
      return head.map((data: any, index: number) => {      
          return <TableCell sx={{fontWeight: 600}} key={'th-cell-'+index}>{ data }</TableCell>
      });
    }
  }
  getTableBodyRows = () => {
    if (this.state.csvData.length) {
      return this.state.csvData.map((data: any, index: number) => {
        let row;
        if (index > 0) {
          row = (
            <TableRow key={'tr-'+index}>
              { this.getRowCells(data) }
            </TableRow>
          )
        }
        return row;
      })
    }
  }
  getRowCells = (row: any) => {
    if (row) {
      return row.map((cell:any, cellIndex: number) => {
        return <TableCell key={'tr-cell-'+cellIndex}>{ cell }</TableCell>
      })
    }
  }
  render() {    
    return (
      <Dialog open={this.props.showDialog} fullScreen>
        <div className="dialog-header">
          <DialogTitle>
            {this.props.resource.description}
          </DialogTitle>
          <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={this.props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        { this.getDialogContent() }
      </Dialog>
    )
  }
}
