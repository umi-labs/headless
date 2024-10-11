[[block]] struct VertexOutput {
    [[location(0)]] position: vec2<f32>;
    [[location(1)]] color: vec3<f32>;
};

[[stage(vertex)]]
fn main([[location(0)]] position: vec2<f32>) -> VertexOutput {
    var output: VertexOutput;
    output.position = position;
    output.color = vec3<f32>(1.0, 1.0, 1.0); // White color
    return output;
}
