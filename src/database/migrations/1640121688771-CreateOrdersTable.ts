import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrdersTable1640121688771 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "orders",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "userId", type: "uuid" },
        { name: "gameId", type: "uuid" },
        { name: "price", type: "decimal" },
        { name: "created_at", type: "timestamp", default: "now()" },
      ]
    }));


    const foreignKeyGames = new TableForeignKey({
      columnNames: ["gameId"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE"
    })

    const foreignKeyUser = new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    })

    await queryRunner.createForeignKey("orders", foreignKeyGames)
    await queryRunner.createForeignKey("orders", foreignKeyUser)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }

}
