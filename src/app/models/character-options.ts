export enum RaceOptions{
    human = "Human",
    dwarf = "Dwarf",
    elf = "Elf",
    halfling = "Halfling"
}

export enum WeaponOptions{
    sword = "Sword",
    axe = "Axe",
    ak47 = "Ak47",
    kalashnikov = "Kalashnikov"
}

export const CharacterOptions = {
    races: [
        RaceOptions.human,
        RaceOptions.dwarf,
        RaceOptions.elf,
        RaceOptions.halfling
    ],
    weapons: [
        WeaponOptions.sword,
        WeaponOptions.axe,
        WeaponOptions.ak47,
        WeaponOptions.kalashnikov
    ]
}

