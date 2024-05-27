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
  const [checklist, setChecklist] = useState(defaultChecklist);

  const handleCheckboxChange = (id) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleAddProject = () => {
    if (projectName.trim() !== "") {
      setProjectName("");
    }
  };

  const totalItems = checklist.length;
  const checkedItems = checklist.filter((item) => item.checked).length;
  const progress = (checkedItems / totalItems) * 100;

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
        <Box width="100%">
          <Text fontSize="lg" mb={4}>
            Project: {projectName || "No project selected"}
          </Text>
          <Progress value={progress} size="lg" colorScheme="teal" mb={4} />
          <Text mb={4}>
            {checkedItems} of {totalItems} items checked ({progress.toFixed(2)}%)
          </Text>
          <VStack align="start" spacing={3}>
            {checklist.map((item) => (
              <HStack key={item.id} width="100%">
                <Checkbox isChecked={item.checked} onChange={() => handleCheckboxChange(item.id)}>
                  {item.text} ({item.type})
                </Checkbox>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
