import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from 'react-flow-renderer';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const Container = styled.div`
  height: 90vh;
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FlowWrapper = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f0f0f0;
`;

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Cold Email' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Wait/Delay' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Lead Source' },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [];

const Flowchart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Handle changes to nodes
  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));

  // Handle changes to edges
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));

  // Add a new connection between nodes
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  // Function to schedule an email
  const handleSchedule = async () => {
    const emailDetails = {
      time: 'in 1 hour',
      email: 'recipient@example.com',
      subject: 'Automated Email',
      body: 'This is a test email sent from the flowchart tool.',
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/schedule`, emailDetails);
      alert('Email scheduled successfully!');
    } catch (error) {
      console.error(error);
      alert('Error scheduling email. Please try again.');
    }
  };

  return (
    <Container>
      <FlowWrapper>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      </FlowWrapper>
      <Button onClick={handleSchedule}>Schedule Email</Button>
    </Container>
  );
};

export default Flowchart;
