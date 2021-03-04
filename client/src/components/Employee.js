import React from 'react';
import { classnames, DataGrid, useThemeProps } from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root : {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },

    dataGrid : {
        color: "white"
    },

    process : {
        margin : theme.spacing(2)
    }
});

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''}${params.getValue('lastName') || ''}`,
    },
    { field: 'sex', headerName: 'Age', width: 90 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'rank', headerName: 'rank', width: 90 },
    { field: 'career', headerName: 'career', width: 90 }
];
  
function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value,)}%`}</Typography>
            </Box>
        </Box>
    );
}

class Employee extends React.Component {

    state = {
        employees : [],
        completed : 0
    }

    // 컴포넌트 생성된 이후 호출
    componentDidMount() {
        this.timer = setInterval(this.progress, 30);
        this.callApi().then(res => this.setState({employees : res})).catch(err => console.log(err));
    };

    // 컴포넌트가 해제되어 제거되기 직전 호출
    componentWillUnmount() {
        clearInterval(this.timer);
    };

    // server.js api 호출
    callApi = async() => {
        const response = await fetch('/home');
        const body = await response.json();
        return body;
    };

    // progress value 값 업데이트 함수
    progress = () => {
        const { completed  } = this.state;
        this.setState({ completed : completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: 400, width: '90%', backgroundColor: 'dark'}}>
                {this.state.employees.length > 0 
                    ?   <DataGrid className={classes.dataGrid} rows={this.state.employees} columns={columns} pageSize={5} checkboxSelection/>
                    :
                    <React.Fragment>
                        <CircularProgressWithLabel className={classes.progress} variant="determinate" value={this.state.completed} />
                        <LinearProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default withStyles(styles)(Employee);