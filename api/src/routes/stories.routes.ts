import { Router } from 'express';

const storiesRouter: Router = Router();

// Get all stories
storiesRouter.get('/', (req, res) => {
  console.log('Fetching all stories');
  res.send({ message: 'Fetching all stories' });
});

// Get a single story by ID
storiesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send({ message: `Fetching story with ID: ${id}` });
});

// Create a new story
storiesRouter.post('/', (req, res) => {
  const newStory = req.body;
  res.status(201).send({ message: 'Story created', story: newStory });
});

// Update a story by ID
storiesRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedStory = req.body;
  res.send({ message: `Story with ID: ${id} updated`, story: updatedStory });
});

// Delete a story by ID
storiesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send({ message: `Story with ID: ${id} deleted` });
});

export default storiesRouter;
