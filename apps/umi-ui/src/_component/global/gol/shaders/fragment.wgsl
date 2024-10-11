[[group(0), binding(0)]] var texture: texture_2d<f32>;
[[group(0), binding(1)]] var sampler: sampler;

[[stage(fragment)]]
fn main([[location(0)]] fragCoord: vec2<f32>) -> [[location(0)]] vec4<f32> {
    let color: vec4<f32> = textureSample(texture, sampler, fragCoord);
    return color;
}
