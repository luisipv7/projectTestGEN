import axios from 'axios'
test('should ', async () => {
    const response = await axios.get(
      "http://localhost:3000/v1/products/1/categories"
    );
    const output = response.data;
    expect(output.total).toBe(60);
});