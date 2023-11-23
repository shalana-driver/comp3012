const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user" //can make a different role called admin
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
];

const userModel = {

  /* FIXED (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    //throw new Error(`Couldn't find user with email: ${email}`);
    return null
  },
  /* FIXED (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return null;
  },
  findOrCreateUser(profile: any) {
    let user = this.findById(profile.id) as any;
    if (!user) {
      user = {
        id: profile.id,
        name: profile.username,
        role: "user"
      }
      database.push(user);
    }
    return user;
  }
};

export { database, userModel };
