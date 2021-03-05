import React from 'react';
import { post } from 'axios';

class EmployeeAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: '',
            userName: '',
            birthday: '',
            gender: '',
            rank: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer().then((response) => {
            console.log(response.data);
        })
        this.state = {
            file: null,
            fileName: '',
            userName: '',
            birthday: '',
            gender: '',
            rank: ''
        }
        window.location.reload();
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer() {
        const url = '/api/employeeAdd';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('rank', this.state.rank);

        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                직위: <input type="text" name="rank" value={this.state.rank} onChange={this.handleValueChange} /><br />
                <button type="submit">추가하기</button>
            </form>

        )
    }

}

export default EmployeeAdd