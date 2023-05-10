import { ChangeEvent, useEffect, useState } from "react";
import "./styles.css";
import data from "./data.json";

export interface Device {
  id: number;
  deviceType: string;
  brand: string;
  model: string;
  storage: string;
  ram: string;
}

//--//
const Example = () => {
  const [devicesData, setDevicesData] = useState<Device[]>(data);
  const [filter, setFilter] = useState<Partial<Device>>({
    deviceType: "",
    brand: "",
    model: "",
  });

  //return content of DeviceType select
  const typeNames = () => {
    const typeNames = devicesData.map((item) => ({
      id: item.id,
      label: item.deviceType,
    }));
    return typeNames.filter(
      (v, i, a) => a.findIndex((v2) => v2.label === v.label) === i
    );
  };

  //return content of Brand select
  const brandNames = () => {
    const brandNames = devicesData.map((item) => ({
      id: item.id,
      label: item.brand,
    }));
    return brandNames.filter(
      (v, i, a) => a.findIndex((v2) => v2.label === v.label) === i
    );
  };

  //return content of Model select
  const modelNames = () => {
    const modelNames = devicesData.map((item) => ({
      id: item.id,
      label: item.model,
    }));
    return modelNames.filter(
      (v, i, a) => a.findIndex((v2) => v2.label === v.label) === i
    );
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    filterData();
  }, [filter]);

  //filter the base array
  const filterData = () => {
    const filteredData = data.filter((device) => filterDevices(device, filter));
    setDevicesData(filteredData);
  };

  //declare filters, one const by filter
  const filterDevices = (device: Device, dataFilter: Partial<Device>) => {
    const isFilteredByType = dataFilter.deviceType
      ? device.deviceType === dataFilter.deviceType
      : true;
    const isFilteredByBrand = dataFilter.brand
      ? device.brand === dataFilter.brand
      : true;
    const isFilteredByModel = dataFilter.model
      ? device.model === dataFilter.model
      : true;
    return isFilteredByType && isFilteredByBrand && isFilteredByModel;
  };

  return (
    <div className="root">
      <h2>Nested Filters Example</h2>
      <div className="filterContainer">
        <select name="deviceType" onChange={(event) => handleSelect(event)}>
          <option value="">All Options</option>
          {typeNames().map((i) => (
            <option value={i.label} key={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        <select name="brand" onChange={(event) => handleSelect(event)}>
          <option value="">All Options</option>
          {brandNames().map((i) => (
            <option value={i.label} key={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        <select name="model" onChange={(event) => handleSelect(event)}>
          <option value="">All Options</option>
          {modelNames().map((i) => (
            <option value={i.label} key={i.id}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Device Type</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Storage</th>
            <th>RAM</th>
          </tr>
        </thead>
        <tbody>
          {devicesData.map((device) => (
            <tr key={device.id}>
              <td>{device.deviceType}</td>
              <td>{device.brand}</td>
              <td>{device.model}</td>
              <td>{device.storage}</td>
              <td>{device.ram}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Example;
