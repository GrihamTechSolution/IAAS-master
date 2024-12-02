class Country {
  name: string;
}

class Internship {
  name: string;
  country: Country;
}

class User {
  firstName: string;
  lastName: string;
  country: Country;
}

export class Testimonial {
  testimony: string;
  imageUrl: string;
  user: User;
  internship: Internship;
}

export class InsertTestimonial {
  applicationID: number;
  testimony: string;
  imageUrl: string;
}
