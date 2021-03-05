import React from 'react';

import '../App.css';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EmployeeAdd from './EmployeeAdd';

const styles = theme => ({
    mainDiv: {
        width: "100%",
        textAlign: "-webkit-center"
    },
    
    root: {
        width: "70%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },

    table: {
        minWidth: "540"
    }
});

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
        employees: [],
        completed: 0,
        lodingState: 0,
    }

    // 컴포넌트 생성된 이후 호출
    componentDidMount() {
        this.timer = setInterval(this.progress, 30);
        this.callApi().then(res => this.setState({ employees: res })).catch(err => console.log(err));
    };

    // 컴포넌트가 해제되어 제거되기 직전 호출
    componentWillUnmount() {
        clearInterval(this.timer);
    };

    // server.js api 호출
    callApi = async () => {
        const response = await fetch('/api/employee');
        const body = await response.json();
        if (body.length >= 0) {
            this.setState({ lodingState: 1 });
        }
        return body;
    };

    // progress value 값 업데이트 함수
    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.mainDiv}> 
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이미지</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>생년월일</TableCell>
                                <TableCell>성별</TableCell>
                                <TableCell>직급</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.lodingState === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan="6" align="center">
                                            <p>직원정보를 조회중입니다..</p>
                                            <CircularProgressWithLabel className={classes.progress} variant="determinate" value={this.state.completed} />
                                            <LinearProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                                        </TableCell>
                                    </TableRow>
                                )
                                    :
                                    this.state.employees.length > 0
                                        ?
                                        this.state.employees.map(c => {
                                            return (
                                                <TableRow key={c.id}>
                                                    <TableCell>{c.id}</TableCell>
                                                    <TableCell><img src={c.image} alt="profile" /></TableCell>
                                                    <TableCell>{c.name}</TableCell>
                                                    <TableCell>{c.birthday.substring(0, 2)}년{c.birthday.substring(2, 3) === '0' ? c.birthday.substring(3, 4) + '월' : c.birthday.substring(2, 4) + '월'}{c.birthday.substring(4, 6)}일</TableCell>
                                                    <TableCell>{c.gender}</TableCell>
                                                    <TableCell>{c.rank}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                        :
                                        <TableRow colSpan="6" align="center">
                                            <TableCell>
                                                조회된 직원이 없습니다.
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <EmployeeAdd />
            </div>
        )
    }
}

export default withStyles(styles)(Employee);