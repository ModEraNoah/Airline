export class Airport {
    public name: string;
    public abbreviation: string;
    public continent: string;
    public country: string;

    constructor(
        name: string,
        abbreviation: string,
        continent: string,
        country: string,
    ) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.continent = continent;
        this.country = country;
    }
}
