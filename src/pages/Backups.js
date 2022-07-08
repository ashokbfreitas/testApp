import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Form } from "shards-react";
import { Table } from "antd";
import Navigation from "../components/Navigation";
import TagFilter from "../components/TagFilter";
import { getAllBackups, getFilteredData } from "../fetcher";



export default function Backups() {
    
    const [backup, setBackup] = useState([]);
    const [deptTags, setDeptTags] = useState([
        {
            id: 1,
            tag: "sales",
            selected : false,
        },
        {
            id: 2,
            tag: "marketing",
            selected : false,
        },
        {
            id: 3,
            tag: "HR",
            selected : false,
        }
    ]);
    const [envTags, setEnvTags] = useState([
        {
            id: 4,
            tag: "dev",
            selected: false, 
        },
        {
            id: 5,
            tag: "staging",
            selected: false, 
        },
        {
            id: 6,
            tag: "prod",
            selected: false,
        }
    ]);
    const [tableCols, setTableCols] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [apiBusy, setApiBusy] = useState(true);
    const [tableBusy, setTableBusy] = useState(true);

    // changing checked status for Department Tags
    const toggleDeptFilter = (id) => {
        setDeptTags(deptTags.map((tag) => tag.id === id ? {...tag, selected: !tag.selected} : tag))
    }

    // changing checked status for Environment Tags
    const toggleEnvFilter = (id) => {
        setEnvTags(envTags.map((tag) => tag.id === id ? {...tag, selected: !tag.selected} : tag))
    }

    const tableTitleFormatting = (columns) => {
        setTableCols([{title: "Department", dataIndex: "department", key: "department"},
        {title: "Environment", dataIndex: "environment", key: "environment"},
        ...columns.map((column) => ({
            title: column,
            dataIndex: column.toLowerCase(),
            key: column.toLowerCase(),
        }))])
    }

    const tableDataFormatting = (data, columns) => {
        
        let dataKey = 0;
        let dataArray = [];
        //console.log(data);
        data.forEach((array) => {
            let obj = {}
            obj["key"] = dataKey;
            //console.log(columns[1]);
            for(let i = 0; i < array.length; i++) {
                obj[columns[i].key] = array[i];
            }
            dataArray.push(obj);
            dataKey += 1;
        })
        setTableData(dataArray);
    }


    // applying filters and generating the URL
    const filterChange = () => {
        const deptFilterWords = [];
        const envFilterWords = [];
        let deptString = "";
        let envString = "";
        deptTags.forEach( tag => tag.selected && deptFilterWords.push(tag.tag));
        envTags.forEach( tag => tag.selected && envFilterWords.push(tag.tag));
        if(deptFilterWords.length > 0) {
            deptString = "department=" + deptFilterWords.join(",");
        }
        if(envFilterWords.length > 0) {
            envString = "environment=" + envFilterWords.join(",");
        }
        getFilteredData(deptString, envString).then((res) => {
            setBackup(res);
        })
        
        tableTitleFormatting(backup.data['columns']);
        tableDataFormatting(backup.data['content'], tableCols);
    }
    
    /*
    const handleFilterChange = () => {
        getAllBackups().then((res) => {
            console.log(res);
            setBackup(res.body);  
        })
    }
    */
    

    const downloadCSV = () => {
        const url = backup.url;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    const setDefault = () => {
        getAllBackups()
            .catch((err) => console.log(err))
            .then((res) => setBackup(res));
        
        //filterChange();
    }

    useEffect(() => {
        setApiBusy(true);
        getAllBackups()
            .catch((err) => console.log(err))
            .then((res) => setBackup(res))
            .finally(() => {
                setApiBusy(false);
            })
    }, []);
    
    useEffect(() => {
        if (! apiBusy) {
            tableTitleFormatting(backup.data['columns']);
            setTableBusy(false);
        }
    }, [apiBusy]);

    useEffect(() => {
        if (!apiBusy) {
            if (!tableBusy) {
                tableDataFormatting(backup.data['content'], tableCols);
            }
           
        }
    }, [tableBusy]);
    
    //console.log(backup);
    return (
        
        <Container>
            <Navigation />
            <h3 style={{textAlign: "center", margin: "30px"}}>Backups</h3>
            <Row>
                <Col style={{margin: "auto 100px"}}>
                    <p style={{margin: "auto", fontWeight: "bold"}}>Department Filter</p>
                    <TagFilter type="Department" tags={deptTags} onChange={toggleDeptFilter}></TagFilter>
                </Col>
                <Col style={{margin: "auto 100px"}}>
                    <p style={{margin: "auto", fontWeight: "bold"}}>Environment Filter</p>
                    <TagFilter type="Environment" tags={envTags} onChange={toggleEnvFilter}></TagFilter>
                </Col>
            </Row>
            <Row>
                <Form style={{margin: "20px auto"}}>
                    <Button theme="primary" onClick={filterChange}>Filter</Button>
                </Form>
            </Row>
            <Row>
                <p style={{margin: "auto", fontWeight: "bold"}}>Backups Preview</p>
            </Row>
            <Row>
                <Table style={{margin: "auto"}} dataSource={tableData} columns={tableCols.slice(0,4)}/>
            </Row>
            <Row>
                <Form style={{margin: "20px auto"}}>
                    <Button theme="secondary" onClick={downloadCSV}>Download CSV</Button>
                </Form>
            </Row>
        </Container>
    )

}