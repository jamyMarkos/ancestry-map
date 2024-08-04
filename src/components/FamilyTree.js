// components/FamilyTree.js
import { useEffect, useState } from "react";

const FamilyTree = () => {
  const [tree, setTree] = useState(null);

  // Fetch Data from JSON Server
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/family");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Build Tree Structure
  const buildTree = (people) => {
    const tree = {};
    const lookup = {};

    // Create a lookup for people by ID
    people.forEach((person) => {
      lookup[person.id] = { ...person, children: [] };
    });

    // Populate the tree with parent-child relationships
    people.forEach((person) => {
      if (person.parents.length > 0) {
        person.parents.forEach((parent) => {
          const parentId = parent?.parent?.id;
          lookup[parentId]?.children?.push(lookup[person.id]);
        });
      } else {
        // If person has no parents listed, they might be the root
        tree[person.id] = lookup[person.id];
      }
    });

    return tree;
  };

  // Render Tree Structure
  const renderTree = (tree) => {
    const renderPerson = (person) => {
      return (
        <div className="person" key={person.id}>
          <div>
            <strong>
              {person.id}
              {person.firstName} {person.lastName}
            </strong>
          </div>
          <div>Born: {person.dob || "Unknown"}</div>
          <div>Birthplace: {person.birthPlace || "Unknown"}</div>
          <div>Country: {person.countryCode || "Unknown"}</div>
          <div>Children: {person.children.length}</div>
          <div className="children">
            {person.children.map((child) => renderPerson(child))}
          </div>
        </div>
      );
    };

    const rootId = Object.keys(tree)[0];
    const rootPerson = tree[rootId];
    return renderPerson(rootPerson);
  };

  // Initialize and Render the Tree
  useEffect(() => {
    const initializeTree = async () => {
      const people = await fetchData();
      if (people) {
        const tree = buildTree(people);
        setTree(tree);
      }
    };

    initializeTree();
  }, []);

  return (
    <div id="family-tree">{tree ? renderTree(tree) : <p>Loading...</p>}</div>
  );
};

export default FamilyTree;
