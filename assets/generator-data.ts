import { config } from 'dotenv';
import { Client } from 'pg';
import { faker, ru } from '@faker-js/faker';

config();

const generatorData = async () => {
  const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
  });

  await client.connect();
  const plantationTypesFromDb = await client.query(`
    SELECT * FROM td_plantation_type;
    `);

  const totalRows = 100;

  const rows = [];
  for (let i = 0; i < totalRows; i++) {
    const totalArea = Math.floor(Math.random() * 1000);
    const vegetableArea = totalArea * 0.6;
    const arableArea = totalArea * 0.4;
    const plantationTypes = new Array(
      Math.ceil(Math.random() * plantationTypesFromDb.rows.length),
    )
      .fill(null)
      .map((a, index) => plantationTypesFromDb.rows[index].id);

    const states = ['GO', 'MG', 'AM'];
    const state = states[Math.floor(Math.random() * states.length)];

    rows.push({
      taxId: gerarCpf(),
      name: faker.person.fullName().replace(/'/g, ' '),
      farmName: faker.company.name().replace(/'/g, ' '),
      city: faker.location.city().replace(/'/g, ' '),
      state: state,
      totalAreaHa: totalArea,
      arableAreaHa: arableArea,
      vegetationAreaHa: vegetableArea,
      plantationTypes: plantationTypes,
    });
  }

  await client.query(
    `
        INSERT INTO tb_rural_producer (
            tax_id,
            name,
            farm_name,
            city,
            state,
            total_area_ha,
            arable_area_ha,
            vegetation_area_ha
        ) VALUES ${rows
          .map(
            (row) =>
              `('${row.taxId}', '${row.name}', '${row.farmName}', '${row.city}', '${row.state}', ${row.totalAreaHa}, ${row.arableAreaHa}, ${row.vegetationAreaHa})`,
          )
          .join(', ')}
        `,
  );

  try {
    const ruralProducersSaved = await client.query(`
        SELECT id, tax_id as "taxId" from tb_rural_producer
        WHERE tax_id IN (${rows.map((row) => `'${row.taxId}'`).join(', ')});
    `);
    const ruralProducerPlantationTypes = [];
    for (const ruralProducer of ruralProducersSaved.rows) {
      ruralProducerPlantationTypes.push({
        ruralProducerId: ruralProducer.id,
        plantationTypes: rows.find((r) => r.taxId === ruralProducer.taxId)
          .plantationTypes,
      });
    }
    await client.query(
      `
        INSERT INTO ta_rural_producer_plantation_type (
            rural_producer_id,
            plantation_type_id
        ) VALUES ${ruralProducerPlantationTypes
          .map((row) => {
            return row.plantationTypes
              .map(
                (plantationType) =>
                  `(${row.ruralProducerId}, ${plantationType})`,
              )
              .join(', ');
          })
          .join(', ')}
        `,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

generatorData()
  .then(() => {
    console.log('Data generated successfully');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => process.exit(0));

function gerarCpf() {
  const num1 = aleatorio();
  const num2 = aleatorio();
  const num3 = aleatorio();
  const dig1 = dig(num1, num2, num3);
  const dig2 = dig(num1, num2, num3, dig1);
  return `${num1}${num2}${num3}${dig1}${dig2}`;
}

function dig(n1, n2, n3, n4?) {
  const nums = n1.split('').concat(n2.split(''), n3.split(''));

  if (n4 !== undefined) {
    nums[9] = n4;
  }

  let x = 0;

  for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i;
  }

  const y = x % 11;
  return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
  const aleat = Math.floor(Math.random() * 999);
  return ('' + aleat).padStart(3, '0');
}
