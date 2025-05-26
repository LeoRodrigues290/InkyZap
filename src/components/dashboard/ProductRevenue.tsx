import { useEffect, useState } from "react"
import { Badge, Table } from "flowbite-react"
import { collection, getDoc, getDocs } from "firebase/firestore"
import { db } from "src/firebase/config"
import SimpleBar from "simplebar-react"

interface Item {
  id: string
  name: string
  count: number
  img?: string
}

export default function ProductRevenue() {
  const [topProducts, setTopProducts] = useState<Item[]>([])
  const [topServices, setTopServices] = useState<Item[]>([])

  useEffect(() => {
    ;(async () => {
      // … seu código de fetch permanece igual …
    })()
  }, [])

  return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Produtos & Serviços mais vendidos
        </h3>

        <SimpleBar className="flex-1 overflow-y-auto">
          {/* Produtos */}
          <Table hoverable className="mb-6 rounded-lg overflow-hidden">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell className="py-3 ps-6">Produto</Table.HeadCell>
              <Table.HeadCell>Vendido</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {topProducts.map(item => (
                  <Table.Row
                      key={item.id}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <Table.Cell className="ps-6">
                      <div className="flex items-center gap-3">
                        {item.img && (
                            <img
                                src={item.img}
                                alt=""
                                className="h-12 w-12 rounded-md object-cover"
                            />
                        )}
                        <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color="info">{item.count}×</Badge>
                    </Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Serviços */}
          <Table hoverable className="rounded-lg overflow-hidden">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell className="py-3 ps-6">Serviço</Table.HeadCell>
              <Table.HeadCell>Realizado</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {topServices.map(item => (
                  <Table.Row
                      key={item.id}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <Table.Cell className="ps-6">
                      <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color="indigo">{item.count}×</Badge>
                    </Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </SimpleBar>
      </div>
  )
}
