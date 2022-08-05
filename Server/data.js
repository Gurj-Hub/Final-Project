// costs of kWh/province - https://www.energyhub.org/electricity-prices/#:~:text=The%20average%20residential%20cost%20of,if%20you%20exclude%20the%20territories.
const costPerKWH = {
  AVG: 0.179,
  ON: 0.13,
  QC: 0.073,
  BC: 0.126,
  AB: 0.166,
  MN: 0.99,
  SK: 0.181,
  NS: 0.171,
  NB: 0.127,
  NL: 0.138,
  PE: 0.174,
  NT: 0.38,
  YT: 0.187,
  NU: 0.375,
};
// from https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2017/market-snapshot-greenhouse-gas-emissions-associated-with-residential-electricity-consumption-vary-significantly-province-territory.html
const averageMonthlyKWH = {
  AVG: 0000,
  ON: 285,
  QC: 673.3,
  BC: 294.17,
  AB: 197.5,
  MB: 521.67,
  SK: 255,
  NS: 385.83,
  NB: 647.5,
  NL: 685.83,
  PE: 127.5,
  NT: 361.67,
  YT: 362.5,
  NU: 301.67,
};

//got average cost for 200W monochrystalline panels from - https://www.homedepot.com/b/Electrical-Renewable-Energy-Solar-Panels/N-5yc1vZcdrk
//average production per day from - https://www.yesenergysolutions.co.uk/advice/how-much-energy-solar-panels-produce-home#:~:text=Most%20residential%20solar%20panels%20on,1%20kW%20and%204%20kW.
const solarPanelData = {
  AVGproductionPerDay: 2,
  AVGcostPerPanel: 360,
};

// incentives fro federal from - https://www.nrcan.gc.ca/energy-efficiency/homes/canada-greener-homes-grant/start-your-energy-efficient-retrofits/plan-document-and-complete-your-home-retrofits/eligible-grants-for-my-home-retrofit/23504#s6
//incentives for provincial from - https://solar-x.ca/solar-incentives-and-rebates-canada/
//incentive for QC from - https://stardustsolar.com/quebec-solar-pv-incentive-programs/
//incentive for SK from - https://prairiesunsolar.com/solar-incentives/sk/
//incentive for MB from - https://www.gov.mb.ca/sd/environment_and_biodiversity/energy/initiatives/solar/incentives.html
//incentive for NL from - https://prairiesunsolar.com/solar-incentives/nl/
//incentive for NT from - https://www.energyhub.org/northwest-territories/#:~:text=The%20largest%20solar%20rebate%20program,maximum%20rebate%20amount%20of%20%2420%2C000.
//incentive for YT from - https://www.solacity.com/solar-rebates-and-incentives-in-canada/#:~:text=Yukon%20Good%20Energy%20Residential%20Incentives%20Program&text=The%20program%20offers%20an%20%240.80,local%20electrical%20utility%20will%20allow.
//incentive for NU from - https://prairiesunsolar.com/solar-incentives/nvt/

const incentives = {
  Federal:
    "Up to 5000$ for project costs and up to 600$ for home evaluations. Additionally an interest-free loan: up to $40,000, with a repayment term of 10 years",
  ON: "Ontario lacks a centralized solar incentive or financing program, though a few targeted incentives are available. The First Nations Conservation Program, for example, offers free efficiency upgrades for on-reserve customers.",
  QC: "A new 20% tax credit offered by Revenu Quebec changes the picture, bringing down the cost significantly.",
  BC: "British Columbia currently has no provincial rebate incentive for solar installations; however, there is a provincial exemption from the sales tax(...). [T]here are several regional solar incentives that fill the place of a centralized program.",
  AB: "Generally speaking, most localities throughout Alberta that offer a solar incentive set it around $0.70/watt, with a maximum of $5,000 in savings",
  MB: "Purchasers who install specified solar heating equipment in Manitoba will qualify for a refundable 10% Green Energy Equipment Tax Credit on the eligible capital costs.",
  SK: "Saskatchewan homeowners may save up to $2,100 in provincial income tax by claiming a 10.5 per cent tax credit on up to $20,000 of eligible home renovation expenses. Eligible expenses include the cost of labour and professional services, building materials, fixtures, on solar energy rentals, and permits.",
  NS: "Nova Scotian homeowners can claim a rebate of $0.60/watt of solar panels installed, up to a maximum of $6,000 or 25% of the total pre-tax system cost",
  NB: "The Total Home Energy Savings Program (THESP) is run by Energie NB Power and offers a rebate that ranges from $0.20/watt to $0.30/watt of solar energy installed.",
  NL: "Home Energy Savings Program (HESP) - The Newfoundland & Labrador Housing Corporation currently offers a grant of up to $5,000 for energy efficiency upgrades to residents whose annual household income equals $32,500 or less. Homeowners must currently have diesel-generated electricity or use 1,000+ litres of oil annually.",
  PE: "PEI’s Solar Electric Rebate Program is administered by EfficiencyPEI and allows homeowners to claim a cash rebate of $1.00/watt, up to a maximum of $10,000 in savings",
  NT: "The Alternative Energy Technologies Program (AETP) allows property owners to receive a 50% rebate on the total cost a solar system including installation up to a maximum rebate amount of $20,000. However, funding is not available for on-grid buildings that use hydroelectricity.",
  YT: "The Yukon Good Energy Residential Incentives Program offers an $0.80 per Watt rebate up to a maximum of $5,000 per system per year. For solar systems the size limit is up to 50 kW or the smaller of what the local electrical utility will allow.",
  NU: "Renewable Energy Home Improvements Program (in progress) – The Nunavut government has announced the development of a program offering a 50% rebate to homeowners installing renewable energy home improvements. The Nunavut government has also announced that the remainder of their budget following the Renewable Energy Home Improvements Program will go towards administering rebates up to $5,000 for renewable energy improvements on cabins specifically.",
};

//data about household items and their monthly averages from - https://www.burlingtonhydro.com/powertoconserve/residential/appliance-usage.html
// & https://unboundsolar.com/solar-information/offgrid-calculator
const productData = {
  products: [
    { name: "Air Compressor - 1/2 Hp", kWh: 0.5, avgPerMonth: 20 },
    { name: "Air Compressor - 1/4 Hp", kWh: 0.25, avgPerMonth: 20 },
    { name: "Air Compressor - 1 Hp", kWh: 1, avgPerMonth: 20 },
    { name: "Air Conditioner - Central 2.5 Ton", kWh: 3.5, avgPerMonth: 720 },
    {
      name: "Air Conditioner - Central 10000 BTU",
      kWh: 3.25,
      avgPerMonth: 720,
    },
    { name: "Air Conditioner - Central 2400B TU", kWh: 3.8, avgPerMonth: 720 },
    { name: "Air Conditioner - Window 6000 BTU", kWh: 0.72, avgPerMonth: 720 },
    { name: "Air Conditioner - Window 9000 BTU", kWh: 1.05, avgPerMonth: 720 },
    { name: "Block Heater", kWh: 0.5, avgPerMonth: 480 },
    { name: "Broiler", kWh: 1.4, avgPerMonth: 10 },
    { name: "Can Opener", kWh: 0.175, avgPerMonth: 1 },
    { name: "Carving Knife", kWh: 0.09, avgPerMonth: 1 },
    { name: "Ceiling Fan", kWh: 0.06, avgPerMonth: 200 },
    { name: "Ceiling Fan - No Bulb", kWh: 0.1, avgPerMonth: 160 },
    { name: "Clock", kWh: 0.005, avgPerMonth: 720 },
    { name: "Clothes Dryer", kWh: 5, avgPerMonth: 16 },
    { name: "Clothes Washer", kWh: 0.5, avgPerMonth: 24 },
    { name: "Computer - Monitor and Printer", kWh: 1.4, avgPerMonth: 10 },
    { name: "Deep Fat Fryer", kWh: 1.5, avgPerMonth: 10 },
    { name: "Dehumidifier", kWh: 0.35, avgPerMonth: 360 },
    { name: "Dishwasher", kWh: 1.3, avgPerMonth: 30 },
    { name: "Drill", kWh: 0.3, avgPerMonth: 3 },
    { name: "Electric Blanket", kWh: 0.18, avgPerMonth: 30 },
    { name: "Electric Heater - Portable", kWh: 1, avgPerMonth: 30 },
    { name: "Exercise Treadmill", kWh: 1.2, avgPerMonth: 15 },
    { name: "Fan Portable", kWh: 0.115, avgPerMonth: 30 },
    { name: "Fish Tank Heater - 10 Gallon", kWh: 0.05, avgPerMonth: 720 },
    { name: "Fish Tank Heater - 50 Gallon", kWh: 0.2, avgPerMonth: 720 },
    { name: "Floor Polisher ", kWh: 0.3, avgPerMonth: 3 },
    { name: "Fluorescent - 2 Tube 4 ft.", kWh: 0.1, avgPerMonth: 100 },
    { name: "Food Blender", kWh: 0.39, avgPerMonth: 5 },
    { name: "Food Freezer", kWh: 0.5, avgPerMonth: 150 },
    { name: "Food Freezer - 15 cu ft.", kWh: 0.335, avgPerMonth: 300 },
    { name: "Food Mixer - Hand and Table", kWh: 0.1, avgPerMonth: 3 },
    { name: "Frying Pan", kWh: 1.15, avgPerMonth: 10 },
    { name: "Furnace Fan Motor", kWh: 0.35, avgPerMonth: 280 },
    { name: "Furnace Fan Motor - Continuous", kWh: 0.35, avgPerMonth: 720 },
    { name: "Garage Opener", kWh: 0.35, avgPerMonth: 3 },
    { name: "Gas Water Heater - Blower", kWh: 0.175, avgPerMonth: 60 },
    { name: "Hair Dryer - Portable", kWh: 1, avgPerMonth: 3 },
    { name: "Heat Exchanger/HRV's", kWh: 0.125, avgPerMonth: 400 },
    { name: "Heat Lamp - Infrared", kWh: 0.25, avgPerMonth: 3 },
    { name: "Heating Cable Eaves", kWh: 0.5, avgPerMonth: 30 },
    { name: "Heating Pad", kWh: 0.0065, avgPerMonth: 15 },
    { name: "Hedge Trimmer", kWh: 0.125, avgPerMonth: 4 },
    { name: "Hot Plate", kWh: 1.32, avgPerMonth: 3 },
    { name: "Hot Tub", kWh: 0.9, avgPerMonth: 720 },
    { name: "Humidifier - Portable", kWh: 0.1, avgPerMonth: 100 },
    { name: "Iron - Hand", kWh: 1, avgPerMonth: 5 },
    { name: "Kettle", kWh: 1.5, avgPerMonth: 5 },
    { name: "Lawn Mower", kWh: 1.5, avgPerMonth: 2 },
    { name: "Lighting Single Lamp - 100 W", kWh: 0.1, avgPerMonth: 50 },
    { name: "Lighting Single Lamp - 60 W", kWh: 0.06, avgPerMonth: 50 },
    {
      name: "Lighting Single Fluorescent Bulb - 13 W",
      kWh: 0.013,
      avgPerMonth: 50,
    },
    { name: "Microwave Oven", kWh: 1, avgPerMonth: 10 },
    { name: "Oil Furnace - Burner", kWh: 0.26, avgPerMonth: 125 },
    { name: "Power Saw", kWh: 0.275, avgPerMonth: 2 },
    { name: "Range - Oven", kWh: 12.5, avgPerMonth: 20 },
    { name: "Refrigerator - Frost Free", kWh: 0.5, avgPerMonth: 300 },
    { name: "Refrigerator - Non Frost Free", kWh: 0.3, avgPerMonth: 300 },
    { name: "Sewing Machine", kWh: 0.075, avgPerMonth: 5 },
    { name: "Shaver", kWh: 0.015, avgPerMonth: 3 },
    { name: "Stereo", kWh: 0.275, avgPerMonth: 20 },
    { name: "Sump Pump 1/2 hp", kWh: 0.5, avgPerMonth: 30 },
    { name: "Sump Pump 3/4 hp", kWh: 1.2, avgPerMonth: 30 },
    { name: "Swimming Pool Filter - 1.0 Hp", kWh: 1.5, avgPerMonth: 720 },
    { name: "Swimming Pool Filter - 1.5 Hp", kWh: 2.1, avgPerMonth: 720 },
    { name: "Swimming Pool Filter - 1/2 Hp", kWh: 0.9, avgPerMonth: 720 },
    { name: "Swimming Pool Filter - 3/4 Hp", kWh: 1.2, avgPerMonth: 720 },
    { name: "Television", kWh: 0.08, avgPerMonth: 200 },
    { name: "Toaster", kWh: 1.15, avgPerMonth: 2 },
    { name: "Toothbrush", kWh: 0.01, avgPerMonth: 1 },
    { name: "Vacuum Cleaner - Central", kWh: 1.6, avgPerMonth: 4 },
    { name: "Vacuum Cleaner - Portable", kWh: 0.8, avgPerMonth: 4 },
    { name: "Vaporizer - 750 W", kWh: 0.75, avgPerMonth: 5 },
    { name: "Video Cassette Recorder", kWh: 0.04, avgPerMonth: 50 },
    { name: "Waffle Iron", kWh: 1.1, avgPerMonth: 1 },
    { name: "Water Bed Heater", kWh: 0.4, avgPerMonth: 150 },
    { name: "Water Heater - Family of 2", kWh: 3.8, avgPerMonth: 70 },
    { name: "Water Heater - Family of 4", kWh: 3.8, avgPerMonth: 105 },
    { name: "Video Game Console", kWh: 0.15, avgPerMonth: 60 },
    { name: "Vacuum", kWh: 1, avgPerMonth: 2 },
    { name: "Laptop", kWh: 0.1, avgPerMonth: 60 },
    { name: "Router", kWh: 0.007, avgPerMonth: 720 },
    { name: "Modem", kWh: 0.007, avgPerMonth: 720 },
    { name: "LCD monitor", kWh: 0.1, avgPerMonth: 60 },
    { name: "TV - Plasma", kWh: 0.2, avgPerMonth: 60 },
    { name: "TV - LCD", kWh: 0.15, avgPerMonth: 60 },
    { name: "Electric Shaver", kWh: 0.015, avgPerMonth: 4 },
    { name: "Coffee Machine", kWh: 1, avgPerMonth: 3 },
    { name: "Espresso Machine", kWh: 0.8, avgPerMonth: 3 },
    { name: "Cable Box", kWh: 0.035, avgPerMonth: 60 },
    { name: "Garbage Disposal", kWh: 0.45, avgPerMonth: 1 },
    { name: "DVD player", kWh: 0.015, avgPerMonth: 36 },
    { name: "CFL Bulb - 40 W Equivalent", kWh: 0.011, avgPerMonth: 120 },
    { name: "CFL Bulb - 60 W Equivalent", kWh: 0.018, avgPerMonth: 120 },
    { name: "CFL Bulb - 20 W Equivalent", kWh: 0.02, avgPerMonth: 120 },
    { name: "CFL Bulb - 25 W Equivalent", kWh: 0.03, avgPerMonth: 120 },
    { name: "Compact Fluorescent - 20 W", kWh: 0.022, avgPerMonth: 120 },
    { name: "Compact Fluorescent - 25 W", kWh: 0.028, avgPerMonth: 120 },
    { name: "Halogen - 40 W", kWh: 0.04, avgPerMonth: 120 },
    { name: "Incandescent - 50 W", kWh: 0.05, avgPerMonth: 120 },
    { name: "Incandescent - 100 W", kWh: 0.1, avgPerMonth: 120 },
    { name: "LED Bulb - 40 W", kWh: 0.01, avgPerMonth: 120 },
    { name: "LED Bulb - 60 W", kWh: 0.013, avgPerMonth: 120 },
    { name: "LED Bulb -75 W", kWh: 0.018, avgPerMonth: 120 },
    { name: "LED Bulb - 100 W", kWh: 0.023, avgPerMonth: 120 },
    { name: "Desktop Computer (STANDARD)", kWh: 0.2, avgPerMonth: 60 },
    { name: "Desktop Computer (GAMING)", kWh: 0.5, avgPerMonth: 60 },
    { name: "Printer", kWh: 0.1, avgPerMonth: 4 },
    { name: "Smart Phone Charger", kWh: 0.005, avgPerMonth: 45 },
    { name: "Tablet Charger", kWh: 0.008, avgPerMonth: 30 },
    { name: "Smartphone", kWh: 0.0003, avgPerMonth: 150 },
  ],
};

module.exports = { costPerKWH, averageMonthlyKWH, productData };
