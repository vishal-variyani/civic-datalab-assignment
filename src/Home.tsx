import { Grid } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import { DataCard } from './components/DataCard';
import React from 'react'
import BudgetApiService from './API/BudgetApiService';
import CsvDialog from './components/Dialogs/CsvDialog';

interface Props {
  
}
export default class Home extends React.Component<Props> {
  state = {
    searchValue: "",
    postData: [],
    showDialog: false,
    fileResource: null
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts = () => {
    BudgetApiService.getPosts({})
    .then((response: any) => {
      this.setState({postData: response.data.result.results});
    }).catch(error => {
      console.error(error);
    })
  }
  handleSearch = (searchValue: String) => {
    console.log(searchValue);
  }
  returnDataCard = () => {
    return this.state.postData.filter((val: any) => {
      if (val.title.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
        return val;
      }
    }).map((post, index) => {
      return <DataCard key={index} post={post} openDialog={this.openCsvDialog}></DataCard>
    })
  }
  openCsvDialog = (resource: any) => {
    this.setState({fileResource: resource})
    this.setState({showDialog: true})
  }
  closeCsvDialog = () => {
    this.setState({showDialog: false})
  }
  render() {
    let dialog;
    if (this.state.showDialog) {
      dialog = <CsvDialog showDialog={this.state.showDialog} onClose={this.closeCsvDialog} resource={this.state.fileResource}/>
    } else {
      dialog = null;
    }
    return (
      <div className="main">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={10} justifyContent="center" style={{display: 'flex'}}>
            <SearchBar
              value={this.state.searchValue}
              onChange={(newValue) => this.setState({searchValue: newValue})}
              onRequestSearch={() => this.handleSearch(this.state.searchValue)}
              className="search-bar"
              onCancelSearch={() => this.setState({searchValue: ""})}
            />
          </Grid>
          <Grid container direction="column" alignItems="center">
            { this.returnDataCard() }
          </Grid>
        </Grid>
        {dialog}
      </div>
    )
  }
}
