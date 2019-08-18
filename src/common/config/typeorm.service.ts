import ConfigService from './config.service';

const defaultOptions = ConfigService.orm_config

export const institutionSchema = { 
    ...defaultOptions,
    name: 'schemaInstitution',
    entities: ["entities/*{.js,.ts}"]
}

export const academicSchema = { 
    ...defaultOptions,
    name: 'schemaAcademic',
    entities: ["entities/*{.js,.ts}"]
}

export const usersSchema = { 
    ...defaultOptions,
    name: 'schemaUsers',
    entities: ["entities/*{.js,.ts}"]
}

export const businessSchema = { 
    ...defaultOptions,
    name: 'schemaBusiness',
    entities: ["entities/*{.js,.ts}"]
}
  