import React, { useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from 'react-flow-renderer';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const lightTheme = {
  body: '#f5f7fa',
  text: '#333',
  flowBackground: '#ffffff',
  buttonBackground: '#007bff',
  buttonHover: '#0056b3',
};

const darkTheme = {
  body: '#121212',
  text: '#e0e0e0',
  flowBackground: '#1e1e1e',
  buttonBackground: '#1e88e5',
  buttonHover: '#1565c0',
};

const Container = styled(motion.div)`
  height: 90vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlowWrapper = styled(motion.div)`
  width: 100%;
  height: 80%;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: ${(props) => props.theme.flowBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.1);
  }
`;

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Cold Email' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Wait/Delay' }, position: { x: 100, y: 100 } },
  { id: '3', type: 'output', data: { label: 'Lead Source' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

const Flowchart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const resetFlowchart = () => {
    setEdges([]);
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {}, // Reset node styles
      }))
    );
  };

  const saveFlowchart = async () => {
    const flowchartData = { nodes, edges };
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save-flowchart`, flowchartData);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to save flowchart.');
    }
  };

  const exportFlowchart = () => {
    const flowchartData = { nodes, edges };
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(flowchartData))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = 'flowchart.json';
    downloadAnchor.click();
  };

  const importFlowchart = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setNodes(importedData.nodes || []);
      setEdges(importedData.edges || []);
    };
    reader.readAsText(file);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <FlowWrapper>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ width: '100%', height: '100%' }}
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
        </FlowWrapper>

        <ButtonContainer>
          <Button onClick={resetFlowchart}>Reset Flowchart</Button>
          <Button onClick={saveFlowchart}>Save Flowchart</Button>
          <Button onClick={exportFlowchart}>Export Flowchart</Button>
          <Button as="label">
            Import Flowchart
            <input
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={importFlowchart}
            />
          </Button>
          <Button onClick={toggleTheme}>
            {theme === lightTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </Button>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Flowchart;
