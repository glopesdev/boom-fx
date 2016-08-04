#version 410
// Original mesh vertex attributes
layout(location = 0) in vec3 vp; // vertex position (in model space)
layout(location = 1) in vec3 vt; // Barycenter hacke in vertex textures (in model space) - face referential
layout(location = 2) in vec3 vn; // vertex normal (in model space)

// Extension mesh vertex attributes (sensors from tuna)
layout(location = 3) in vec3 accel;
layout(location = 4) in vec3 gyro;
layout(location = 5) in vec3 mag;


// Output attributes
out vec3 position;
out vec3 normal;
out vec3 color;
flat out int faceId;

// Render parameters
uniform mat4 mvp;
uniform mat4 mvp2;
uniform mat4 mv;

// Return rotation matrix
mat3  rotationMatrixXYZ(vec3 r)
{
   float cx = cos(radians(r.x));
   float sx = sin(radians(r.x));
   float cy = cos(radians(r.y));
   float sy = sin(radians(r.y));
   float cz = cos(radians(r.z));
   float sz = sin(radians(r.z));
   
   return mat3(cy * cz,    cx * sz + sx * sy * cz,    sx * sz - cx * sy * cz,
			-cy * sz,   cx * cz - sx * sy * sz,      sx * cz + cx * sy * sz,
			sy,         -sx * cy,               cx * cy);               
}
	
mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

void main()
{
  faceId = gl_VertexID / 4;
  //color = vec3(0,1,1);
  color = gyro*10;
  //color = (normalize(mag))*15;
  //vec3 vc = (vp - vt) * 0.7 * length(accel) + vt + (accel)/4*length(vp - vt);
  //vec3 vc = (vp - vt) * 0.7 *length(accel) + vt + accel*20;
  //mat4 rotation = rotationMatrix(gyro, length(gyro));
  //vec4 vc = (rotation*vec4(vp,1.0) - (rotation*(vec4(vt,1.0)))) + vec4(vt,1.0);
  mat3 rotation = rotationMatrixXYZ(gyro*50);
  vec3 vc = ((rotation*vp) - (rotation*vt)) + vt;
  
  
  //vec4 v = vec4(vc - vec3(0,0,1), 1.0);
  //vec4 v = vc;
  vec4 v = vec4(vc, 1.0);
  //gl_Position = mvp2*(mvp * v);
  gl_Position = (mvp * v);
  mat4 normalmat = transpose(inverse(mv));
  position = vec3(mv * v);
  normal = normalize(vec3(normalmat * vec4(vn, 1.0)));
}