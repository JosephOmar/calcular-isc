"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isc, setIsc] = useState<number>(0);

  const [product, setProduct] = useState<string>("");

  const [fuelType, setFuelType] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [cylinderCapacity, setCylinderCapacity] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [usage, setUsage] = useState<string>("");
  const [specialUsers, setSpecialUsers] = useState<string>("");

  const [sugarAmount, setSugarAmount] = useState<string>("");
  const [beverageType, setBeverageType] = useState<string>("");
  const [exclusions, setExclusions] = useState<string>("");

  const [productPrice, setProductPrice] = useState<number>(0);
  const [igv, setIgv] = useState<number>(18);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    let totalPrice = productPrice;
    console.log(totalPrice);
    totalPrice = totalPrice * ((100 + isc) / 100);
    console.log(totalPrice);
    totalPrice = totalPrice * ((100 + igv) / 100);
    totalPrice = Number(totalPrice.toFixed(2));
    setFinalPrice(totalPrice);
  }, [productPrice, isc, igv]);

  useEffect(() => {
    let newIsc = 0;

    // Evaluar reglas para el ISC basado en las selecciones

    // Tasa del 0%
    if (
      condition === "usado" &&
      (specialUsers === "misiones_diplomaticas" ||
        specialUsers === "organismos_internacionales")
    ) {
      newIsc = 0;
    } else if (
      condition === "nuevo" &&
      usage === "transporte_personas" &&
      specialUsers === "misiones_diplomaticas"
    ) {
      newIsc = 0;
    } else if (
      vehicleType === "camioneta" &&
      specialUsers === "misiones_diplomaticas"
    ) {
      newIsc = 0;
    }

    // Tasa del 5%
    else if (
      condition === "nuevo" &&
      fuelType === "gasolina" &&
      cylinderCapacity === "1400_inferior"
    ) {
      newIsc = 5;
    } else if (vehicleType === "motocicleta" && fuelType === "gasolina") {
      newIsc = 5;
    }

    // Tasa del 7.5%
    else if (
      condition === "nuevo" &&
      fuelType === "gasolina" &&
      cylinderCapacity === "1400_1500"
    ) {
      newIsc = 7.5;
    }

    // Tasa del 10%
    else if (
      condition === "nuevo" &&
      fuelType === "gasolina" &&
      cylinderCapacity === "1500_superior"
    ) {
      newIsc = 10;
    } else if (vehicleType === "motocicleta" && fuelType === "gasolina") {
      newIsc = 10;
    }

    // Tasa del 12%
    else if (
      condition === "nuevo" &&
      fuelType === "diesel" &&
      usage === "transporte_personas"
    ) {
      newIsc = 12;
    }

    // Tasa del 17%
    else if (condition === "usado" && usage === "transporte_personas") {
      newIsc = 17;
    }

    // Tasa del 25%
    else if (
      condition === "usado" &&
      (fuelType === "gasolina" ||
        fuelType === "diesel" ||
        fuelType === "hibrido" ||
        fuelType === "electrico")
    ) {
      newIsc = 25;
    } else if (vehicleType === "camioneta" && condition === "usado") {
      newIsc = 25;
    }

    // Tasa del 40%
    else if (vehicleType === "tractor") {
      newIsc = 40;
    } else if (condition === "usado" && usage === "transporte_mercancias") {
      newIsc = 40;
    }

    // Establecer el ISC calculado
    setIsc(newIsc);
  }, [fuelType, condition, cylinderCapacity, vehicleType, usage, specialUsers]);

  useEffect(() => {
    let newIsc = 0;

    // Evaluar reglas para el ISC basado en las selecciones

    // Tasa del 0% por exclusiones (bebidas con registro sanitario especial o propiedades para la salud)
    if (
      exclusions === "registro_sanitario" ||
      exclusions === "propiedades_salud"
    ) {
      newIsc = 0; // Tasa del 0% por exclusiones
    } else if (sugarAmount === "0.5_inferior") {
      // Tasa del 12% para bebidas con azúcar inferior a 0,5 g/100 ml
      newIsc = 12;
    } else if (sugarAmount === "0.5_5") {
      // Tasa del 17% para bebidas con azúcar entre 0,5 g/100 ml y 5 g/100 ml
      newIsc = 17;
    } else if (sugarAmount === "5_superior") {
      // Tasa del 25% para bebidas con azúcar igual o superior a 5 g/100 ml
      newIsc = 25;
    }

    // Establecer el ISC calculado
    setIsc(newIsc);
  }, [sugarAmount, beverageType, exclusions]);

  const handleTabacos = () => {
    setProduct("Tabacos");
    setIsc(50);
  };

  const handleGames = () => {
    setProduct("Juegos de Azar");
    setIsc(10);
  };

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl pt-10">Calcular ISC - Sistema Al Valor</h1>
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl text-red-500">Seleccionar Productos</h2>
        <div className="flex gap-5 *:px-4 *:py-2 *:bg-green-400 *:rounded-lg *:cursor-pointer ">
          <div
            className="hover:bg-yellow-200"
            onClick={() => setProduct("Vehiculos")}
          >
            Vehiculos
          </div>
          <div
            className="hover:bg-yellow-200"
            onClick={() => setProduct("Bebidas")}
          >
            Bebidas
          </div>
          <div className="hover:bg-yellow-200" onClick={() => handleTabacos()}>
            Tabacos
          </div>
          <div className="hover:bg-yellow-200" onClick={() => handleGames()}>
            Juegos de Azar
          </div>
        </div>
      </div>
      <div>
        <div>
          Producto seleccionado: <span className="font-bold">{product}</span>
        </div>
      </div>
      <div>
        {product === "" ? (
          <div className="py-5">Sin producto seleccionado</div>
        ) : (
          <div className="py-5 text-red-500 font-semibold">
            Seleccione las Caracteristicas del Producto
          </div>
        )}
        <span></span>
        {product === "Vehiculos" ? (
          <div className="flex flex-col gap-5">
            <div>
              <label>Combustible:</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione el tipo de combustible</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="semidiesel">Semidiésel</option>
                <option value="gas">Gas</option>
                <option value="electrico">Eléctrico</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>

            {/* Condición */}
            <div>
              <label>Condición:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione la condición</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>
            </div>

            {/* Cilindrada (Solo si selecciona Gasolina) */}
            {fuelType === "gasolina" && (
              <div>
                <label>Cilindrada (solo para gasolina):</label>
                <select
                  value={cylinderCapacity}
                  onChange={(e) => setCylinderCapacity(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Seleccione la cilindrada</option>
                  <option value="1400_inferior">
                    Inferior o igual a 1,400 cm³
                  </option>
                  <option value="1400_1500">
                    Superior a 1,400 cm³ pero inferior o igual a 1,500 cm³
                  </option>
                  <option value="1500_superior">Superior a 1,500 cm³</option>
                </select>
              </div>
            )}

            {/* Tipo de Vehículo */}
            <div>
              <label>Tipo de Vehículo:</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione el tipo de vehículo</option>
                <option value="automovil">Automóviles</option>
                <option value="camioneta">Camionetas</option>
                <option value="motocicleta">Motocicletas</option>
                <option value="tractor">Tractor</option>
              </select>
            </div>

            {/* Uso del Vehículo */}
            <div>
              <label>Uso del Vehículo:</label>
              <select
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione el uso del vehículo</option>
                <option value="transporte_personas">
                  Transporte de personas
                </option>
                <option value="transporte_mercancias">
                  Transporte de mercancías
                </option>
              </select>
            </div>
            {/* Usuarios Especiales */}
            <div>
              <label>Usuarios Especiales:</label>
              <select
                value={specialUsers}
                onChange={(e) => setSpecialUsers(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">
                  Seleccione si aplica a usuarios especiales
                </option>
                <option value="misiones_diplomaticas">
                  Misiones diplomáticas
                </option>
                <option value="organismos_internacionales">
                  Organismos internacionales
                </option>
              </select>
            </div>
            <div className="mt-5 p-4 border rounded bg-gray-100">
              <h2 className="text-center">Datos Seleccionados</h2>
              <p>
                <strong>Combustible:</strong> {fuelType || "No seleccionado"}
              </p>
              <p>
                <strong>Condición:</strong> {condition || "No seleccionado"}
              </p>
              {fuelType === "gasolina" && (
                <p>
                  <strong>Cilindrada:</strong>{" "}
                  {cylinderCapacity || "No seleccionado"}
                </p>
              )}
              <p>
                <strong>Tipo de Vehículo:</strong>{" "}
                {vehicleType || "No seleccionado"}
              </p>
              <p>
                <strong>Uso:</strong> {usage || "No seleccionado"}
              </p>
              <p>
                <strong>Usuarios Especiales:</strong>{" "}
                {specialUsers || "No seleccionado"}
              </p>
            </div>
            <div>Impuesto Selectivo Al Consumo: {isc}%</div>
          </div>
        ) : product === "Bebidas" ? (
          <div className="flex flex-col gap-5">
            <div>
              <label>Cantidad de Azúcar:</label>
              <select
                value={sugarAmount}
                onChange={(e) => setSugarAmount(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione la cantidad de azúcar</option>
                <option value="0.5_inferior">Inferior a 0,5 g/100 ml</option>
                <option value="0.5_5">Entre 0,5 g/100 ml y 5 g/100 ml</option>
                <option value="5_superior">
                  Igual o superior a 5 g/100 ml
                </option>
              </select>
            </div>

            {/* Tipo de Bebida */}
            <div>
              <label>Tipo de Bebida:</label>
              <select
                value={beverageType}
                onChange={(e) => setBeverageType(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Seleccione el tipo de bebida</option>
                <option value="agua_mineral">Agua mineral</option>
                <option value="cerveza_sin_alcohol">Cerveza sin alcohol</option>
                <option value="bebidas_no_alcoholicas">
                  Bebidas no alcohólicas
                </option>
              </select>
            </div>

            {/* Exclusiones */}
            <div>
              <label>Exclusiones:</label>
              <select
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">
                  Seleccione si la bebida tiene exclusiones
                </option>
                <option value="sin_exclusiones">Sin exclusiones</option>
                <option value="registro_sanitario">
                  Con registro sanitario especial
                </option>
                <option value="propiedades_salud">
                  Con propiedades para la salud
                </option>
              </select>
            </div>

            {/* Mostrar datos seleccionados */}
            <div className="mt-5 p-4 border rounded bg-gray-100">
              <h2 className="text-center">Datos Seleccionados</h2>
              <p>
                <strong>Cantidad de Azúcar:</strong>{" "}
                {sugarAmount || "No seleccionado"}
              </p>
              <p>
                <strong>Tipo de Bebida:</strong>{" "}
                {beverageType || "No seleccionado"}
              </p>
              <p>
                <strong>Exclusiones:</strong> {exclusions || "No seleccionado"}
              </p>
            </div>
            <div>Impuesto Selectivo Al Consumo: {isc}%</div>
          </div>
        ) : product === "Tabacos" ? (
          <div>Impuesto Selectivo Al consumo: 50%</div>
        ) : product === "Juegos de Azar" ? (
          <div>Impuesto Selectivo Al consumo: 10%</div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <div className="mt-5 p-4 border rounded bg-gray-100">
          <h2 className="text-center">Calcular Precio Final</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label className="mr-2">Precio del Producto sin IGV:</label>
                <span className="text-lg font-bold">S/</span>
                <input
                  type="number"
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="border p-2 rounded w-full"
                  placeholder="Ingrese el precio"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label className="mr-2">IGV (18%):</label>
                <input
                  type="number"
                  value={igv}
                  onChange={(e) => setIgv(Number(e.target.value))}
                  className="border p-2 rounded w-full"
                  placeholder="IGV calculado"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label className="mr-2">Precio Final:</label>
                <span className="text-lg font-bold">S/</span>
                <input
                  type="number"
                  value={finalPrice}
                  readOnly
                  className="border p-2 rounded w-full"
                  placeholder="Precio final calculado"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
