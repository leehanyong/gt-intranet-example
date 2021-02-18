import React from 'react';

class Employee extends React.Component {
    render() {
        return (
            <div>
                <EmployeeInfo name={this.props.name} sex={this.props.sex} age={this.props.age} rank={this.props.rank} />
                <EmployeeCareer career={this.props.career} />
            </div>
        )
    }
}

class EmployeeInfo extends React.Component {
    render() {
        return(
            <div>
                <h2>이름 : {this.props.name}</h2>
                <p>성별 : {this.props.sex}</p>
                <p>나이 : {this.props.age}</p>
                <p>직급 : {this.props.rank}</p>
            </div>
        )
    }
}

class EmployeeCareer extends React.Component {
    render() {
        return(
            <div>
                <p>경력 : {this.props.career}</p>
            </div>
        )
    }
}

export default Employee;