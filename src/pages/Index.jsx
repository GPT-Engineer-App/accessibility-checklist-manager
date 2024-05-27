import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Checkbox, Progress, Text, Box, Heading, Divider } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const defaultChecklist = [
  { id: 1, text: "Use semantic HTML", type: "implementation", checked: false },
  { id: 2, text: "Ensure keyboard accessibility", type: "implementation", checked: false },
  { id: 3, text: "Provide text alternatives for non-text content", type: "implementation", checked: false },
  { id: 4, text: "Ensure sufficient color contrast", type: "post-implementation", checked: false },
  { id: 5, text: "Test with screen readers", type: "post-implementation", checked: false },
];

const Index = () => {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCheckboxChange = (id) => {
    if (selectedProject) {
      const updatedChecklist = selectedProject.checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      const updatedProject = { ...selectedProject, checklist: updatedChecklist };
      setProjects(projects.map((project) => (project.name === selectedProject.name ? updatedProject : project)));
      setSelectedProject(updatedProject);
    }
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleAddProject = () => {
    if (projectName.trim() !== "") {
      const newProject = {
        name: projectName,
        checklist: defaultChecklist.map((item) => ({ ...item, checked: false })),
      };
      setProjects([...projects, newProject]);
      setSelectedProject(newProject);
      setProjectName("");
    }
  };

  const totalItems = selectedProject ? selectedProject.checklist.length : 0;
  const checkedItems = selectedProject ? selectedProject.checklist.filter((item) => item.checked).length : 0;
  const progress = selectedProject ? (checkedItems / totalItems) * 100 : 0;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Accessibility Checklist
        </Heading>
        <HStack width="100%">
          <Input placeholder="Enter project name" value={projectName} onChange={handleProjectNameChange} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddProject}>
            Add Project
          </Button>
        </HStack>
        <Divider />
        {selectedProject ? (
          <Box width="100%">
            <Text fontSize="lg" mb={4}>
              Project: {selectedProject.name}
            </Text>
            <Progress value={progress} size="lg" colorScheme="teal" mb={4} />
            <Text mb={4}>
              {checkedItems} of {totalItems} items checked ({progress.toFixed(2)}%)
            </Text>
            <VStack align="start" spacing={3}>
              {selectedProject.checklist.map((item) => (
                <HStack key={item.id} width="100%">
                  <Checkbox isChecked={item.checked} onChange={() => handleCheckboxChange(item.id)}>
                    {item.text} ({item.type})
                  </Checkbox>
                </HStack>
              ))}
            </VStack>
          </Box>
        ) : (
          <Text>No project selected</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
