const API_BASE_URL = 'https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const getAssignmentDetails = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/assignment_details`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching assignment details:', error);
    throw error;
  }
};

const getAssignmentSubmissions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/assignment_candidates?status=review&limit=10&offset=0`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching assignment submissions:', error);
    throw error;
  }
};

const getUserAssignmentScore = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidate_assignment_data?user_id=30&assignment_id=${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user assignment score:', error);
    throw error;
  }
};

export {
  getAssignmentDetails,
  getAssignmentSubmissions,
  getUserAssignmentScore,
};
