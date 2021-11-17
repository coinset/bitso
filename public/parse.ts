type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

function parseError(text: string): ErrorResponse {
  return JSON.parse(text);
}

export { parseError };
